/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use server';

import {app, gamesRef} from '@/app/lib/firebase-server-initialization';
import {GameIdSchema, gameStates} from '@/app/types';
import {getAppCheck} from 'firebase-admin/app-check';
import {getAuth} from 'firebase-admin/auth';
import {z} from 'zod';

export async function updateAnswerAction({gameId, answerSelection, token, appCheckToken}: {gameId: string, answerSelection: boolean[], token: string, appCheckToken: string}) {
  await getAppCheck().verifyToken(appCheckToken);
  const authUser = await getAuth(app).verifyIdToken(token);

  // Parse request (throw an error if not correct)
  GameIdSchema.parse(gameId);

  const gameRef = await gamesRef.doc(gameId);
  const gameDoc = await gameRef.get();
  const game = gameDoc.data();

  if (game.state !== gameStates.AWAITING_PLAYER_ANSWERS) {
    return new Error(`Answering is not allowed during ${game.state}.`);
  }

  // answerSelection must be an array of booleans as long as the game question answers
  const currentQuestion = game.questions[game.currentQuestionIndex];
  const ValidAnswerSchema = z.array(z.boolean()).length(currentQuestion.answers.length);
  ValidAnswerSchema.parse(answerSelection);

  // update database to start the game
  await gameRef.update({
    [`questions.${game.currentQuestionIndex}.playerGuesses.${authUser.uid}`]: answerSelection,
  });
}
