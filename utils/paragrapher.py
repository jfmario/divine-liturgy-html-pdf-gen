import sys

with open ( 'txt.txt', 'r' ) as f:
    ls = f.readlines()
    for line in ls:
        print ( '"%s",' % line.strip () )