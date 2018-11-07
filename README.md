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
900


SELECT * FROM profiles

sub                                                  firstName  lastName    avatar
---------------------------------------------------  ---------  ----------  ----------------------------------------------------------------------
did:ethr:0x03230b1d564655140174a39f519ce231ac43d7bf  Mohammad   Hansen      https://s3.amazonaws.com/uifaces/faces/twitter/kimcool/128.jpg
did:ethr:0x1decc84ef70ab3d1bde64f533a898f8eadab3b95  Ernie      Welch       https://s3.amazonaws.com/uifaces/faces/twitter/jayphen/128.jpg
did:ethr:0x26d8b40882263d2a1cf8bb4feaa58ab5e54b359b  Albertha   Shanahan    https://s3.amazonaws.com/uifaces/faces/twitter/newbrushes/128.jpg
did:ethr:0x27d3d0ba6e5af2168fe7bf4121d8297d48220932  Justus     Herzog      https://s3.amazonaws.com/uifaces/faces/twitter/ralph_lam/128.jpg
did:ethr:0x2f52448dd010d2157c953bc37779891afff2980c  Ora        Ernser      https://s3.amazonaws.com/uifaces/faces/twitter/tweetubhai/128.jpg
did:ethr:0x62d939a3482894607a5e81785b94b754352d7fce  Brionna    Barrows     https://s3.amazonaws.com/uifaces/faces/twitter/mastermindesign/128.jpg
did:ethr:0x7d2394864871dcc687d60be25bbec2b2bdd24be8  Keegan     White       https://s3.amazonaws.com/uifaces/faces/twitter/xiel/128.jpg
did:ethr:0x893ca3d11a10c669c734947d55ecb73b119da855  Salvatore  Parisian    https://s3.amazonaws.com/uifaces/faces/twitter/scottgallant/128.jpg
did:ethr:0x99ad5518cbefb0fd8b0367a6ca65ae39ca40a5f8  Dario      Hamill      https://s3.amazonaws.com/uifaces/faces/twitter/bpartridge/128.jpg
did:ethr:0xa86b0fe00e4aac5663fd13767c4c95b7e5b086a9  Ursula     Murray      https://s3.amazonaws.com/uifaces/faces/twitter/ludwiczakpawel/128.jpg
did:ethr:0xbb94e70f0d6c484cffb5f6c0733b00fbfbd890f2  Emmanuel   Dibbert     https://s3.amazonaws.com/uifaces/faces/twitter/ivanfilipovbg/128.jpg
did:ethr:0xbcd3da8d436b3756d709dbc998d61e61be08e899  Fred       Hirthe      https://s3.amazonaws.com/uifaces/faces/twitter/sreejithexp/128.jpg
did:ethr:0xca2235476fe2783f3c85ae7730a864c7f29a9752  Desmond    Osinski     https://s3.amazonaws.com/uifaces/faces/twitter/charliegann/128.jpg
did:ethr:0xd2223c835c5b2d694e34fa33c0ce2ee7abe540b0  Elliott    Macejkovic  https://s3.amazonaws.com/uifaces/faces/twitter/VinThomas/128.jpg
did:ethr:0xf3273078eb9167b0a8b6c029cafd7b8531d9ec40  Monica     Gusikowski  https://s3.amazonaws.com/uifaces/faces/twitter/kanickairaj/128.jpg
```