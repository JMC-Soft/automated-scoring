# GPT 데이터 증강 방법

1. GPT 데이터 증강


2. 0점짜리는 zeroDA.json, 4점짜리는 perfectDA.json


3. `src/preprocess.js` 실행


4. `src/preprocess/mergeData.js` 실행


5. `data/origin/data.json` 에 전처리된 데이터가 저장됨

# 형태소 제거 버전 증강 방법

1. GPT 데이터 증강


2. `token.json`, `preprocessToken.json`, `tokenizeDA.json`을 `[]`로 초기화


3. `src/tokenize/crawl.js` 실행

   - 주의 : 100개마다 out of memory 에러가 발생하므로, 에러 발생시 재실행


4. `src/tokenize/preprocess.js` 실행


5. `src/tokenize/index.js` 실행 
   - `Array(20)`은 하나의 데이터당 20개의 증강을 시도한다는 의미


# 문장 순서 변경 버전 증강 방법

1. GPT 데이터 증강


2. `src/shuffle/index.js` 실행

   - `Array(20)`은 하나의 데이터당 20개의 증강을 시도한다는 의미

   
# 파일

1. `src/utils/makeTrainJson.js` 실행
   - type 변경 필수


2. `src/utils/makeTrainExcel.js` 실행
   - type 변경 필수


3. `src/utils/mergeTrainExcel.js` 실행


4. `src/mergeAll.js` 실행