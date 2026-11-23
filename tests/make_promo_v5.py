from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'previews'/'v5'
W,H=1920,1130
im=Image.new('RGB',(W,H),(245,245,241));d=ImageDraw.Draw(im)
# gradient background
for y in range(H):
    t=y/H;d.line((0,y,W,y),fill=(int(248-12*t),int(249-15*t),int(247-13*t)))
# warm/luminous atmospheric accent
ov=Image.new('RGBA',(W,H));od=ImageDraw.Draw(ov);od.ellipse((1140,100,2260,1320),fill=(40,150,151,37));ov=ov.filter(ImageFilter.GaussianBlur(190));im=Image.alpha_composite(im.convert('RGBA'),ov)
d=ImageDraw.Draw(im)
F='/usr/share/fonts/opentype/inter/InterDisplay-Bold.otf'
R='/usr/share/fonts/opentype/inter/Inter-Regular.otf'
SB='/usr/share/fonts/opentype/inter/Inter-SemiBold.otf'
font=lambda p,s:ImageFont.truetype(p,s)
d.text((90,45),'GELIKROOMS',fill=(20,43,55),font=font(F,63))
d.text((90,123),'ПРЕМИАЛЬНАЯ АДМИНКА  /  ЮKASSA',fill=(18,119,123),font=font(SB,24))
d.text((1275,92),'DESKTOP  +  MOBILE',fill=(74,97,104),font=font(SB,25))
# frame shadow helper
def shadow_box(rect,radius=30,blur=23,shift=16):
    layer=Image.new('RGBA',im.size);ld=ImageDraw.Draw(layer)
    x0,y0,x1,y1=rect
    ld.rounded_rectangle((x0,y0+shift,x1,y1+shift),radius=radius,fill=(15,42,52,95))
    layer=layer.filter(ImageFilter.GaussianBlur(blur));im.alpha_composite(layer)
# desktop top viewport crop at 1125 pixels, rescale width 1110
s=Image.open(OUT/'01-desktop-yookassa.png').convert('RGB').crop((0,0,1440,1120))
s=s.resize((1110,864),Image.Resampling.LANCZOS)
dx,dy=85,216
shadow_box((dx-17,dy-50,dx+1127,dy+883),27,27,17)
d=ImageDraw.Draw(im)
d.rounded_rectangle((dx-17,dy-50,dx+1127,dy+884),radius=25,fill=(17,46,58))
d.rounded_rectangle((dx-7,dy-39,dx+1117,dy+871),radius=15,fill=(255,255,255))
# faux browser toolbar
d.rounded_rectangle((dx-7,dy-39,dx+1117,dy-2),radius=14,fill=(238,244,240))
for ix,c in enumerate([(236,129,109),(232,193,106),(108,187,152)]):d.ellipse((dx+13+ix*22,dy-26,dx+24+ix*22,dy-15),fill=c)
d.text((dx+440,dy-29),'gelikrooms.ru  /  admin',fill=(78,103,108),font=font(R,16))
im.paste(s,(dx,dy))
# phone renders
for n,(file,x,y,w) in enumerate([('05-mobile-navigation.png',1527,300,288),('04-mobile-yookassa.png',1275,240,313)]):
    src=Image.open(OUT/file).convert('RGB')
    h=round(844/390*w)
    src=src.resize((w,h),Image.Resampling.LANCZOS)
    shadow_box((x-14,y-15,x+w+14,y+h+17),44,24,18)
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((x-14,y-15,x+w+14,y+h+17),radius=43,fill=(12,35,44))
    # rounded phone screen mask
    mask=Image.new('L',(w,h));md=ImageDraw.Draw(mask);md.rounded_rectangle((0,0,w,h),radius=29,fill=255)
    im.paste(src,(x,y),mask)
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((x+w*.33,y+6,x+w*.66,y+22),radius=12,fill=(14,28,33))
    d.rounded_rectangle((x-14,y-15,x+w+14,y+h+17),radius=43,outline=(9,34,41),width=7)
# bottom summary strap
d=ImageDraw.Draw(im)
d.rounded_rectangle((1248,1014,1838,1086),radius=23,fill=(13,54,65))
d.text((1278,1031),'БРОНИ  •  ОПЛАТА  •  ВОЗВРАТЫ',font=font(SB,24),fill=(241,252,247))
out=OUT/'GelikRooms_v5_YooKassa_Web_Mobile.png'
im.convert('RGB').save(out,optimize=True)
print(out,im.size)