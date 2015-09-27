
with open ( 'txt.txt', 'r' ) as f:
    ls = f.readlines()
    for line in ls:
        print ( '<p>%s</p>' % line.strip () )