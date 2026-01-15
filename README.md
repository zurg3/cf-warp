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
$ cd cf-warp
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
$ cd cf-warp
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
- awg (AmneziaWG 1.0)
- awg_lite (AmneziaWG 1.0 Lite)
- awg_15 (AmneziaWG 1.5)
- awg_15_lite (AmneziaWG 1.5 Lite)

If `mode` is not provided, a WireGuard config will be generated

## Thanks

https://github.com/yyuueexxiinngg/some-scripts/tree/master/cloudflare
