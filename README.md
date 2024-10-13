## DoubleCherryGB GB GTS REST API

<img src="/img/gbgts.png">

**author:** Tim Oelrichs<br> **email:** timoelrichs@gmail.com<br>

<br>

## Deno REST API for the DoubleCherryGB GB GTS (in Development)

<br>

GBGTS aims to bring an online link-trading system to the Game Boy and Game Boy
Color. It provides an online Pokémon Trading Pool for the GB/GBC Pokémon games
(Red, Blue, Yellow, Silver, Gold, and Crystal), with potential future support
for other games.

The frontend allows players to select Pokémon from the online pool and register
them to their in-game Trainer ID.

The
[DoubleCherryGB-libretro](https://github.com/TimOelrichs/doublecherryGB-libretro)
core can automatically load these Pokémon when you enter the in-game Cable Club.
Once traded, your Pokémon will then be added to the online pool.


run it locally with
```
deno run --allow-net --watch --unstable main.ts
```


