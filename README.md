# Sample data generator

This script creates sqlite database with sample signed data.

First it creates specified number of ethr-did identities, and then uses them to sign data (`firstName`, `lastName`, `avatar` and `email`) about each other.

## Usage

```
npm run start -- --dids 15

Creating identities...
Done.
Signing claims...
Done.
Creating tables and views
Done.
Inserting values...
Done.

SELECT count(*) FROM signed_data

count(*)
--------
1125


SELECT * FROM profiles

sub                                                  name                   firstName   lastName  profileImage
---------------------------------------------------  ---------------------  ----------  --------  ----------------------------------------------------------------------
did:ethr:0x0d5d69697aaf3d80a878508ff3a1dd48d0dd3076  Gillian Wyman          Ignacio     Legros    https://s3.amazonaws.com/uifaces/faces/twitter/xalionmalik/128.jpg
did:ethr:0x0e49f07c4b9447dee7d54d6a19213b47f802fb81  Leatha Hayes           Kirsten     O'Hara    https://s3.amazonaws.com/uifaces/faces/twitter/vitor376/128.jpg
did:ethr:0x38b5e8332396164c3741babda6e2fbbff4f24df1  Hailee Hansen          Alayna      Reinger   https://s3.amazonaws.com/uifaces/faces/twitter/d_nny_m_cher/128.jpg
did:ethr:0x532bd2a999a9a930bff04e54a527e26880c45445  Ashtyn Mante           Carmelo     Hauck     https://s3.amazonaws.com/uifaces/faces/twitter/jjsiii/128.jpg
did:ethr:0x6b19bdcb2dca2d6237a322189d38dcc909f6b230  Amely Haag             Josephine   McGlynn   https://s3.amazonaws.com/uifaces/faces/twitter/mtolokonnikov/128.jpg
did:ethr:0x78d44e48fd2ab0441efdd2473ce060e39997f32e  Bria Pfannerstill      Monty       Legros    https://s3.amazonaws.com/uifaces/faces/twitter/xalionmalik/128.jpg
did:ethr:0x7b8d9a2cb0b529ffffd0bce75822f9f350d647a2  D'angelo Daugherty IV  Sigurd      Bernier   https://s3.amazonaws.com/uifaces/faces/twitter/ryanmclaughlin/128.jpg
did:ethr:0x825c1e6bca7702c1add59bebb5d8669f9d3dfe0e  Chanel Harris          Clay        Walker    https://s3.amazonaws.com/uifaces/faces/twitter/txcx/128.jpg
did:ethr:0x9658a3218316d0118776aaed31e095219292903c  Chasity Ledner         Dawn        Olson     https://s3.amazonaws.com/uifaces/faces/twitter/cicerobr/128.jpg
did:ethr:0x9d54d0276a8cadb0874664bd21a87378468ae058  Gustave Kirlin         Rozella     Ernser    https://s3.amazonaws.com/uifaces/faces/twitter/michaelmartinho/128.jpg
did:ethr:0xa1ceb955278acfd953a752a67b40d9432a9b0a95  Tamia Tromp            Keenan      Torp      https://s3.amazonaws.com/uifaces/faces/twitter/loganjlambert/128.jpg
did:ethr:0xa35180b6a5edc83530422f4ea11cad69053cd543  Delaney Rau III        Constantin  King      https://s3.amazonaws.com/uifaces/faces/twitter/begreative/128.jpg
did:ethr:0xa501fd2dee7c454f2300354841a657044cb3011c  Friedrich Larkin       Herminio    Denesik   https://s3.amazonaws.com/uifaces/faces/twitter/bassamology/128.jpg
did:ethr:0xcb6f97a1fc3dab53861e25ae415ae623012c8385  Aiyana Barton Sr.      Felix       Jacobs    https://s3.amazonaws.com/uifaces/faces/twitter/adobi/128.jpg
did:ethr:0xde7b1282ff803c9ddcd639c961029f7ab7208fc6  Marvin Gottlieb        Lamar       O'Keefe   https://s3.amazonaws.com/uifaces/faces/twitter/xripunov/128.jpg
