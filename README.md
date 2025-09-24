# cf-warp

Cloudflare WARP config generator for WireGuard and AmneziaWG

## Usage

By using this, you agree the [Privacy Policy](https://www.cloudflare.com/application/privacypolicy/) and [Terms of Service](https://www.cloudflare.com/application/terms/) of Cloudflare 1.1.1.1

### Official Web version deployment

The most easiest way to get a WARP config for WireGuard/AmneziaWG is download it from here: [https://zurg3.github.io/cf-warp/](https://zurg3.github.io/cf-warp/)

### With Node.js (Web version)

#### Step 1

Install and start the Web version

```
$ git clone https://github.com/zurg3/cf-warp.git
$ cd cf-warp/web
$ npm install
$ npm start
```

#### Step 2

Open [http://localhost:3000](http://localhost:3000) in web browser

#### Step 3

Download a config you need

### With Node.js (CLI version)

#### Step 1

Install and run the CLI version

```
$ git clone https://github.com/zurg3/cf-warp.git
$ cd cf-warp/web
$ npm install
$ npm run cli
```

#### Step 2

A config will be generated in the same directory

## Ways to run the CLI version

- `$ cf-warp [mode]`
- `$ npm run cli [mode]`
- `$ node cli.js [mode]`

## Available config modes

- wg (WireGuard)
- awg_full (AmneziaWG Full)
- awg_lite (AmneziaWG Lite)
- awg_min (AmneziaWG Min)
- awg_max (AmneziaWG Max)

If `mode` is not provided, a WireGuard config will be generated

## AmneziaWG config modes

|          | Full   | Lite   | Min   | Max    |
| -------- | ------ | ------ | ----- | ------ |
| **Jc**   | 120    | 4      | 4     | 128    |
| **Jmin** | 23     | 8      | 2     | 1      |
| **Jmax** | 911    | 32     | 10    | 1280   |
| **S1**   | 0      | -      | -     | 0      |
| **S2**   | 0      | -      | -     | 0      |
| **H1**   | 1      | -      | -     | 1      |
| **H2**   | 2      | -      | -     | 2      |
| **H3**   | 3      | -      | -     | 3      |
| **H4**   | 4      | -      | -     | 4      |

## Thanks

https://github.com/yyuueexxiinngg/some-scripts/tree/master/cloudflare
