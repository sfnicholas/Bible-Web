dynamic loading for better performance and user experience. Here's a suggested approach:
Store the Bible content in JSON format locally, but split it into smaller files, such as one file per book or even per chapter. This approach allows for faster initial loading and reduces the amount of data sent to the client at once.

Implement dynamic loading of content as the user navigates through the Bible. Load only the necessary chapters or verses when requested.
Use Next.js API routes to create a simple API that serves the Bible content from these JSON files. This approach leverages server-side capabilities while maintaining control over your data.

gn
ex
lv
nm
dt
js
jud
rt
1sm
2sm
1kgs
2kgs
1ch
2ch
ezr
ne
et
job
ps
prv
ec
so
is
jr
lm
ez
dn
ho
jl
am
ob
jn
mi
na
hk
zp
hg
zc
ml
mt
mk
lk
jo
act
rm
1co
2co
gl
eph
ph
cl
1ts
2ts
1tm
2tm
tt
phm
hb
jm
1pe
2pe
1jo
2jo
3jo
jd
re

gn 創世記 創
ex 出埃及記 出
lv 利未記 利
nm 民數記 民
dt 申命記 申
js 約書亞記 書
jud 士師記 士
rt 路得記 得
1sm 撒母耳記上 撒上
2sm 撒母耳記下 撒下
1kgs 列王紀上 王上
2kgs 列王紀下 王下
1ch 歷代志上 代上
2ch 歷代志下 代下
ezr 以斯拉記 拉
ne 尼希米記 尼
et 以斯帖記 斯
job 約伯記 伯
ps 詩篇 詩
prv 箴言 箴
ec 傳道書 傳
so 雅歌 歌
is 以賽亞書 賽
jr 耶利米書 耶
lm 耶利米哀歌 哀
ez 以西結書 結
dn 但以理書 但
ho 何西阿書 何
jl 約珥書 珥
am 阿摩司書 摩
ob 俄巴底亞書 俄
jn 約拿書 拿
mi 彌迦書 彌
na 那鴻書 鴻
hk 哈巴谷書 哈
zp 西番雅書 番
hg 哈該書 該
zc 撒迦利亞書 亞
ml 瑪拉基書 瑪
mt 馬太福音 太
mk 馬可福音 可
lk 路加福音 路
jo 約翰福音 約
act 使徒行傳 徒
rm 羅馬書 羅
1co 哥林多前書 林前
2co 哥林多後書 林後
gl 加拉太書 加
eph 以弗所書 弗
ph 腓立比書 腓
cl 歌羅西書 西
1ts 帖撒羅尼迦前書 帖前
2ts 帖撒羅尼迦後書 帖後
1tm 提摩太前書 提前
2tm 提摩太後書 提後
tt 提多書 多
phm 腓利門書 門
hb 希伯來書 來
jm 雅各書 雅
1pe 彼得前書 彼前
2pe 彼得後書 彼後
1jo 約翰壹書 約一
2jo 約翰貳書 約二
3jo 約翰參書 約三
jd 猶大書 猶
re 啟示錄 啟
