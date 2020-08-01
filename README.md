# js-mania-calc
mania scoring calculation in js because im bored and im not home

## source
calulations are from the wiki:
https://osu.ppy.sh/help/wiki/Game_Modes/osu%21mania#score

## things to note
this is not accurate

because the scores are treated as `MAX -> 300 -> ... -> miss`

meaning highest hitvalues are calculated first
then the lower ones

this calc does not take into account non FC scores
