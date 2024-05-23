---
title: 'Root Domain Extractor - Server-side GTM Variable Template'
imgUrl: 'img/bg-clouds.jpg'
imgAlt: 'Article image - Storm clouds'
published: true
datePublished: '2024-04-06'
summary: 'This variable can be used to extract only the root domain from URL so that you could unify traffic sources (e.g. from facebook or instagram).'
tags: ['SGTM', 'Templates', 'Variables']
---

![Text][img/bg-clouds.jpg]

# Variable file

![[Extract Root Domain (3).tpl]]

# Test code in SGTM variable

```js
const log = require('logToConsole');
const js = require('JSON');

const testCases = [
  {
    inputType: 'custom',
    externalCheckKey: 'https://sanitino.cz?abcdef',
    inputValue: 'https://www.abcde.compari.ro/abcdef',
    outputType: 'hostname',
    onlyExternal: true,
    rootMatch: true,
    stripWWW: false,
    expectedOutput: 'www.compari.ro'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://www.sanitino.cz/',
    inputValue: 'http://www.abcde.compari.ro/abcdef',
    outputType: 'fullURL',
    onlyExternal: false,
    rootMatch: false,
    stripWWW: true,
    expectedOutput: 'http://compari.ro/abcdef'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://www.sanitino.cz/',
    inputValue: 'mydomain.com',
    outputType: 'hostname',
    onlyExternal: true,
    rootMatch: true,
    stripWWW: true,
    expectedOutput: undefined
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://sanitino.cz?abcdef',
    inputValue: 'https://sanitino.cz/?guid=abcde',
    outputType: 'fullURL',
    onlyExternal: false,
    rootMatch: true,
    stripWWW: false,
    expectedOutput: 'https://sanitino.cz/?guid=abcde'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://www.sanitino.cz/',
    inputValue: 'https://www.abcde.sanitino.cz/',
    outputType: 'hostname',
    onlyExternal: false,
    rootMatch: false,
    stripWWW: false,
    expectedOutput: 'www.sanitino.cz'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://www.sanitino.cz/',
    inputValue: 'https://abcde.sanitino.cz/',
    outputType: 'hostname',
    onlyExternal: true,
    rootMatch: false,
    stripWWW: true,
    expectedOutput: 'sanitino.cz'//'abcde.sanitino.cz'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://sanitino.cz?abcdef',
    inputValue: 'https://abcde.compari.ro',
    outputType: 'fullURL',
    onlyExternal: true,
    rootMatch: true,
    stripWWW: false,
    expectedOutput: 'https://compari.ro/'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://sanitino.cz?abcdef=abcde',
    inputValue: 'https://www.sanitino.cz/abcde',
    outputType: 'hostname',
    onlyExternal: false,
    rootMatch: true,
    stripWWW: true,
    expectedOutput: 'sanitino.cz'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://www.sanitino.cz/',
    inputValue: 'https://abcde.sanitino.cz/',
    outputType: 'fullURL',
    onlyExternal: true,
    rootMatch: true,
    stripWWW: false,
    stripProtocol: true,
    expectedOutput: 'https://abcde.sanitino.cz/'
  },
  {
    inputType: 'custom',
    externalCheckKey: 'https://sanitino.cz?abcdef=abcdef',
    inputValue: 'https://www.abcde.compari.ro.com/',
    outputType: 'hostname',
    onlyExternal: false,
    rootMatch: false,
    stripWWW: true,
    expectedOutput: 'compari.ro.com'
  }
];


const testResults = [];
testCases.forEach((testCase, index) => {

  const actualOutput = runCode(testCase);
  assertThat(actualOutput === testCase.expectedOutput);
  testCases[index].actualOutput = actualOutput;

  log("*********************************************");
  log("Test: " + index);
  log("stripWWW: " + testCase.stripWWW);
  log("stripProtocol: " + testCase.stripProtocol);
  log("rootMatch: " + testCase.rootMatch);
  log("onlyExternal: " + testCase.onlyExternal);
  log("Input: " + testCase.inputValue);
  log("Output type: " + testCase.outputType);
  log("Expected Output: " + testCase.expectedOutput);
  log("Actual Output: " + testCase.actualOutput);

  testResults.push(testCase.actualOutput === testCase.expectedOutput);
});

log('Tests passed: ' + testResults.filter(t => t).length);
log('Tests NOT passed: ' + testResults.filter(t => !t).length);

assertThat(testResults.filter(t => t).length === 0);
```

# Test curl request
## Encoding using python (version with comments)

```bash
# Set referrers (dr = page_referrer) to test and dl (page_location) params
referrers=("https://abcde.compari.ro" "https://sanitino.cz" "https://sgtm.sanitino.io.cz" "https://sgtm.sanitino.cz" "https://www.i.facebook.com" "https://lm.facebook.com/abcdefghijklmnop")

dl="https://sanitino.cz/"

# SGTM preview string
x_gtm_server_preview="ZW52LTMzfEdJeHJGSGJKS2E5ZWVqWENUUVFPb3d8MThkMTY5OGFkNDRhMjlmNGUyYmMw"

# Event name
en="TEST_EVENT_CURL"

# Loop the referrers
for dr in "${referrers[@]}"
do
	# Encode dl and dr
	encoded_dl=$(python -c "import urllib.parse;
	print(urllib.parse.quote('''$dl'''))")

	encoded_dr=$(python -c "import urllib.parse;
	print(urllib.parse.quote('''$dr'''))")

	url="https://sgtm.sanitino.cz/g/collect?v=2&en=$en&tid=G-1234&cid=123.456&dl=$encoded_dl&dr=$encoded_dr"

	curl -H "x-gtm-server-preview: $x_gtm_server_preview" "$url"
done
```

## Without comments

```bash
referrers=("https://abcde.compari.ro" "https://sanitino.cz" "https://sgtm.sanitino.io.cz" "https://sgtm.sanitino.cz" "https://www.i.facebook.com" "https://lm.facebook.com/abcdefghijklmnop")

dl="https://sanitino.cz/"

x_gtm_server_preview="ZW52LTMzfEdJeHJGSGJKS2E5ZWVqWENUUVFPb3d8MThkMTY5OGFkNDRhMjlmNGUyYmMw"

en="TEST_EVENT_CURL"

for dr in "${referrers[@]}"
do
encoded_dl=$(python -c "import urllib.parse;
print(urllib.parse.quote('''$dl'''))")

encoded_dr=$(python -c "import urllib.parse;
print(urllib.parse.quote('''$dr'''))")

url="https://sgtm.sanitino.cz/g/collect?v=2&en=$en&tid=G-1234&cid=123.456&dl=$encoded_dl&dr=$encoded_dr"

curl -H "x-gtm-server-preview: $x_gtm_server_preview" "$url"
done
```

## Testing results

-   https://prnt.sc/bRXDdm47axhx

### Test heading 3

# Remarks

==Sometimes, websites are on a subdomain in which case we don't want to extract the root domain as it would appear as a traffic from different website: https://prnt.sc/e2BqWfwqYXoH. In the variable, this behavior is controlled by these config options: https://prnt.sc/CFVyJZ7dmRbC. The 1st option controls whether to extract root domain only for external referrers and the 2nd option controls how do we check whether the hostname is external. We can either match only on the root domain (sgtm.sanitino.cz == sanitino.cz) or on full hostname (sgtm.sanitino.cz != sanitino.cz). Note that `'www.'` or protocol don't play a role in the check. When we determine that the hostname is not external, the full hostname is returned. ==

**It'd be benficial to also test this setup in cross-domain tracking setup !**
