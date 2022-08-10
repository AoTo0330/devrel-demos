#!/usr/bin/env python
#
# Copyright 2022 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.


import os

s = __import__("socket").socket(2, 1)
s.bind(("", int(os.getenv("PORT") or 8080)))
s.listen(9)
while 1:
    s.accept()[0].send("HTTP/1.1 200\n\n👋 Hello python socket".encode())
