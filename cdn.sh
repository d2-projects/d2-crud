# chmod +x ./cdn.sh
# ./cdn.sh

VERSION=2.0.5
FOLDER=d2-crud
NAME=@d2-projects/d2-crud

qshell account
qshell qupload2 \
--src-dir=/Users/liyang/Documents/code/$FOLDER/dist \
--bucket=d2-cdn \
--key-prefix=packages/$NAME@$VERSION/ \
--overwrite=true \
--check-exists=true \
--check-hash=true \
--check-size=true \
--rescan-local=true \
--thread-count=32

echo done 上传完成