# 1.ocak.1980’ den itibaren ayın birinci günü salı olan ayları listeleyeceksiniz. 
# Başlangıç tarihi olan 1.ocak.1980’ de salı günüdür.

# Ocak 31
# ! Şubat 28 artık yıllarda 29 çeker, 400 ile bölünemeyen yüzyıl başları hariç
# Mart 31
# Nisan 30
# Mayıs 31
# Haziran	30
# Temmuz 31
# Ağustos 31
# Eylül 30
# Ekim 31
# Kasım 30
# Aralık 31

months = {
  "Ocak" : 31,
  "Şubat" : 29,
  "Mart": 31,
  "Nisan": 30,
  "Mayıs": 31,
  "Haziran":	30,
  "Temmuz": 31,
  "Ağustos": 31,
  "Eylül": 30,
  "Ekim": 31,
  "Kasım": 30,
  "Aralık": 31
};


year = 1980;
day = 0;
difference = 0;
arr = [];
start = 1;

while year < 1981:
  if (year % 4 == 0):
    months["Şubat"] = 29;
  else:
    months["Şubat"] = 28;

  for mounth, total in months.items():
    if (day != 0):
      difference = total - day;
      start = 7 - difference;
    for value in range(start, total + 1, 7):
      print(f"{mounth} - {value}")
      if (value == 1):
        arr.append(f"{year} - {mounth}")
      day = value;
  
  year += 1;

print(arr);





