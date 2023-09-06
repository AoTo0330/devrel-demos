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

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBr0i2bC9kdsdRVh-9pQ5yFOjxpweiTJrQ',
  projectId: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_PROJECT || 'cloud-quiz-next',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:406096902405:web:7311c44c3657568af1df6c',
};
