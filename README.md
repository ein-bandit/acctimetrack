# acc time track

upload session result json and some metadata

data is internally mapped and filtered to store best lap per driver in the
session mapped is stored to redis

see a presentation on the web with shareable links

have a look at [acctimetrack.herokuapp.com](http://acctimetrack.herokuapp.com)

## endpoints

to be defined

## usage

copy unix or windows install script to your server add as background service
(checks when result file changes and auto uploads)

### step by step

to be defined

## development setup

install vscode

install deno

install vscode_deno extension enable deno for workspace

copy `.env.dist` to `.env` and fill values

run with `deno task start`

open localhost:3000

### redis

use a local or distributed redis. fill env variables with connection parameters

## deployment
