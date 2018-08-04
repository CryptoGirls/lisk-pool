# TRX distribution software

Use: to distribute a percentage of TRX rewards to the voters

## Configuration
Edit config.json and config_snapshot.json and modify the lines with your settings:

- coin: TRX
- sraddress: Super Representative's address
- node: node where you get data
- nodepay: node used for payments. It's recommended to change the nodepay to http://127.0.0.1:9000 after clone and install Rovak's docker containers repo (Please see the details in dependencies section)
- percentage: percentage to distribute
- minpayout: the minimum amount for a payout (NOTICE: in config_snapshot.json DO NOT modify minpayout)
- pk: the private key of your address
- saveindb: true if you want to save snapshots in your database
- dbname: name of your database; not needed if saveindb is set to false
- dbuser: user of your database; not needed if saveindb is set to false
- dbpass: password of your database; not needed if saveindb is set to false
- dbhost: localhost; not needed if saveindb is set to false
- donations: a list of object (address: amount) for send static amount every payout
- donationspercentage: a list of object (address: percentage) for send static percentage every payout
- skip: a list of address to skip

Edit poollogs.json and modify the lines with your settings:
- lastpayout: the unixtimestamp of your last payout or the date of pool starting
- totalwithdraw: Total of the TRX claimed from tronscan.org. Every time you will claim rewards, you have to add that value here

Edit the following line in votes.js with your SR address:

const CANDIDATE_ADDRESS = '';


### Private pool
If you want to run a private pool, you need to edit config.json and:
- private: set to true
- whitelist: put a list of addresses you wish to include


## Dependencies
```
sudo apt install python3-pip

sudo pip3 install python-dateutil

sudo pip3 install python-dateutil --upgrade

sudo apt-get install postgresql postgresql-contrib

sudo apt-get install build-dep python-psycopg2

sudo pip3 install psycopg2-binary

git clone https://github.com/CryptoGirls/trx-pool

cd trx-pool

sudo apt install nodejs

sudo apt install npm

npm install axios

- node doesn't work? Install a newer version:

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

sudo apt-get install -y nodejs

```

If you want to save snapshots in your database, create the following tables in your database:

```
create table voters(
id SERIAL PRIMARY KEY,
voterAddress varchar,
votes float,
votedOn int,
prevDate int,
insertDate int,
toPay float,
snapshotNo int);

create table constants(
id SERIAL PRIMARY KEY,
name varchar,
stringValue varchar,
numberValue float,
timestamp timestamp,
prevDate int,
insertDate int,
snapshotNo int);
```

To not send the private key in plain text to the network, it's recommended to install and configure docker containers made by Rovak.

```
apt install docker docker-compose

git clone https://github.com/tronscan/tronscan-docker

```

In docker-compose.yml file put your SR IP in full and solidity IPs:

```
      NODE_FULL_IP: "YOUR_SR_IP_HERE"
      NODE_FULL_PORT: "50051"
      NODE_SOLIDITY_IP: "YOUR_SR_IP_HERE"
      NODE_SOLIDITY_PORT: "50051"
      ENABLE_SYNC: "false"
      ENABLE_NETWORK_SCANNER: "false"
      SECRET_KEY: "aSLtAkzrIY9pTPyboOih"
```

Run it in screen:

```
./start.sh
```

Now you should be able to call the API from http://127.0.0.1:9000



## Running it

1. At the start of each round - 4 times a day

```node votes.js```

2. At the end of each round - 3 times a day (the script will calculate pending amounts)

```python3 trxpool.py```

3. At the end of the 4th round - once a day (the script will create a file called "payments.sh")

```python3 trxpool.py -c config_snapshot.json```

The file "payments.sh" will have all payments shell commands. Run this file with:

```bash payments.sh```

The payments will be broadcasted every second.


## Batch mode

The scripts are also runnable by cron.

- give rights to execute

`chmod +x votes.sh`

`chmod +x trx.sh`

`chmod +x trx24.sh`

- execute the scripts

`./votes.sh`

`./trx.sh`

`./trx24.sh`


## Command line usage

```
usage: trxpool.py [-h] [-c config.json] [-y] [--min-payout MINPAYOUT]

TRX payments script

optional arguments:
  -h, --help            show this help message and exit
  -c config.json        set a config file (default: config.json)
  -y                    automatic yes for log saving (default: no)
  --min-payout MINPAYOUT
                        override the minpayout value from config file
```

## Author
This software is created by lisk delegate "dakk", please consider a small donation if you
use this software: 
- "2324852447570841050L" for lisk
- "7725849364280821971S" for shift
- "AZAXtswaWS4v8eYMzJRjpd5pN3wMBj8Rmk" for ark
- "8691988869124917015R" for rise

## Features added by CryptoGirls
- adapted the script for TRX
- save snapshots of the votes in the database

Please consider a small donation if you use this software:
- TRX: "TQk7fK1WfRqothSdTQBoYf7o81Byohzb1Y"
- BTC: "3Qv3uRZufA5t7GEz6BBH2khKbeUc7967RJ"
- ETH: "0xD174B1A997d9CB3F7D2dE284EE37e77a5de030bE"

## License
Copyright 2017-2018 Davide Gessa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

