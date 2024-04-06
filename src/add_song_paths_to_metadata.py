import json

BASE_PATH_PREFIX = "/home/capstone/git/play-piano-frontend/public/data/"
BASE_PATH_SUFFIX = "/data.mid"

json_data = []
new_json_data = []

with open("metadata.json") as f:
    json_data = json.load(f)

for song in json_data:
    artist = song["artist"]
    title = song["title"]
    song["midi"] = f"{BASE_PATH_PREFIX}{artist} - {title}{BASE_PATH_SUFFIX}"
    new_json_data.append(song)

with open("new_metadata.json", "w") as of:
    json.dump(new_json_data, of)