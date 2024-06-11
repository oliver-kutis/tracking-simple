---
title: '[SK] Tutorial, Enrich server-side GTM data in real-time with Azure Cosmos DB and Function App'
alternativeTitle: 'How to enrich server-side data without using Firestore — A thorough guide.'
imgUrl: 'img/bg-clouds.jpg'
published: true
datePublished: '2024-04-06'
dateEdited: '2024-05-02'
summary: 'some summary'
tags: ['SGTM', 'Templates', 'Variables']
---

<script lang="ts">
  import Img from '$lib/components/Img.svelte';
</script>

Link to the template file: ![[Azure Cosmos DB - Fetch document.tpl]]

# 1. Introduction

### 3rd level heading

In the ever-evolving landscape of web analytics, Google introduced server containers in Google Tag Manager back in 2020, unlocking a realm of possibilities. Among these features is the capability to enrich real-time data using the Firestore API, a service nestled within Google Cloud Platform (GCP). Analysts worldwide have embraced this functionality, but what if your tech stack resides with other cloud vendors, like AWS or Azure? Navigating the server container setup and management in such scenarios can be a daunting task, with sparse resources available. Thanks to Simo Ahava, we can now setup the tagging server on [Azure](https://www.simoahava.com/analytics/server-side-tagging-azure-app-service/) or [AWS](https://www.simoahava.com/analytics/deploy-server-side-google-tag-manager-aws/) easily.

This tutorial addresses the roadblocks encountered when trying to leverage server container capabilities **without relying on GCP**. If you’ve embarked on the journey of hosting your server container on Azure, you might have discovered that using Firestore for data enrichment is not a seamless process. The alternative path involves migrating data to GCP’s Firestore and generating access files — a process laden with complexities, to finally enrich your real-time data. 

**Fear not!** This guide will showcase an alternative route, using Azure’s Cosmos DB, the counterpart to Firestore in the Azure ecosystem. Both are low-latency NoSQL databases with similar functionalities. 

> Sometimes there are just cases when you don’t want to or can’t migrate your data to Bigquery, regardless where you host your tagging server. **In the next article**, I’ll demonstrate the same process using GCP’s Cloud Function, offering flexibility for users across different cloud platforms. This can be handy if your database is on Azure and your tagging server is hosted on GCP. I also find the setup of Cloud Function easier in GCP than on Azure.

Before we delve into the tutorial, let’s set the stage. I **don’t** **assume** where your tagging server is hosted. For the purpose of this article, it’s not relevant. However, I **assume** your database is comfortably hosted on Azure’s cloud, with no reservations about loading its contents into Cosmos DB. Thus, I am also assuming that you have an existing Azure account. For the sake of this example, you could also setup a new _free account._

Additionally, I am not going to show how to migrate the data to Cosmos DB (maybe in some other article). 

# 2. Setup Cosmos DB and Function App

In this section, we’ll focus on how to setup your own Cosmos DB account and use some sample data. I recommend you to work with sample data as well so you can validate your setup. 

## 2.1. Azure Cosmos DB setup

Navigate to Azure Cosmos DB and create new account. The click _create_ for “Azure Cosmos DB for NoSQL”. 

<Img src="/img/azure-real-time-sgtm/azure-cosmos-db-setup-account.png" alt="Azure Cosmos DB - Account setup"/>

> _Note: I recommend you to go for the serverless option as it’s better suited for unstable traffic._

Other setup options are up to your configuration and I won’t go into detail there.

Next, navigate to your newly created Cosmos DB account and in the “Quick start” section. Create a sample “Items” container. 

<Img src="/img/azure-real-time-sgtm/azure-cosmos-db-setup-container.png" alt="Azure Cosmos DB - Container setup"/>

After it’s created, go to “Data Explorer” section and the container will be located under “ToDoList” database. You can either generate sample data manually, upload it or use the option to download a simple app which will insert sample data using language of your choice. Here I have decided to go with Node.js application. After you’ve downloaded the sample app, you should open editor of your choice (I use VS Code) and do the following:

1. [Download node.js](https://nodejs.org/en/download) if you haven’t already in the past. I trully recommend you to download version 18 or lower. Version 20 may not work as expected as Azure Functions have just a “preview” support for it. In either case, verify your version by typing following in the terminal:

This way you'll verify that node.js is on your system
```bash
node -v
```

2. Move yourself to the home directory with `cd ~` command
3. Navigate yourself to directory where the app has been downloaded. In my case it’s “Downloads”. Extract the path to the folder.

<Img src="/img/azure-real-time-sgtm/directory-mac.png" alt="Project directory on my PC"/>

4. In terminal, type your path into terminal:

This is my path to the file (you can provide complete path as well)  

```bash
cd Downloads/sql-nodejs/sql-nodejs
```

5. When you’re succesfully there, install required node modules

```bash
npm install
```

6. Next, we’ll run the sample app which will create a database, collection and document:

```bash
node app.js
```

Next, go back to Azure Cosmos DB account and navigate to “Data Explorer”. I’ve also manually added one document just for fun. You should see something like this:

<Img src="/img/azure-real-time-sgtm/azure-cosmos-db-demo-document.png" alt="Azure Cosmos DB document demo"/>

You can see that one of the documents has a **partitionKey** while the other does not. This will be important when querying the data. 

Now that we have succesfully managed to create a sample database, we’ll move on to setup the Function App. The Function App will serve as an API to which we’ll send requests and it will retrieve the desired documents.

> Note: I’ve tried to retrieve the documents from Cosmos DB directly using their REST API. After reading through not ideally written documentation, I’ve found out that you need to generate an Authentication token using the Primary key and some other information. This wouldn’t necessarily be a problem, however server-side GTM Templates API doesn’t offer required hashing algorithm to generate the token. More on this can be found on following links in case you figure out a way to make request directly using the REST API:

- [Guide on querying documents from Cosmos DB](https://learn.microsoft.com/en-us/rest/api/cosmos-db/query-documents)
- [Required request headers](https://learn.microsoft.com/en-us/rest/api/cosmos-db/common-cosmosdb-rest-request-headers)
- [Generating the Authorization token](https://learn.microsoft.com/en-us/rest/api/cosmos-db/access-control-on-cosmosdb-resources?redirectedfrom=MSDN)  
- The required hashing algorithm is HMAC and I am no cryptograph to create it on my own (not even sure if it’s possible).

## 2.2. Azure Function App setup

We’ll now proceed to create a Function App which will pass requests to _“@azure/cosmos”_ SDK and retrieve the data. Get your fingers ready(or toes if you prefer) because we’re going to do some coding!

First of all, **I recommend you to** [**download VS Code**](https://code.visualstudio.com/download) if you haven’t already, whole setup will be done in here. VS Code offers a set of Azure extensions which are crucial for our setup. I’ve tried to setup the Function App in the Azure directly, but it seemed too error prone and debugging wasn’t optimal either.

_Note: All steps in the previous section could be done in the IDE terminal as well._

In the following sections we’ll go through the setup of your local development worskpace (Section **1.2.1 — Basic setup**). In the second section, we’ll generate the code (Section **1.2.2 — Coding**) and in the last section we’ll test the app (Section **1.2.3 — Debugging**). Let’s begin. 

## 2.3. Basic setup

Now, let’s go step by step to setup the Function App:

1. Click the extension icon in the left panel and search for “Azure Function” and click “Install” button to install the extension. 

![](https://cdn-images-1.medium.com/max/1600/1*D6pltL14WAb6GXKQ7Z1hEA.png)

The “Install” button is missing in my case as I have already installed the extension.

2. Now you should see an Azure extension in the left pannel. Click on it. You should see “Sign in to Azure” button, click it. If you don’t see it, press `CMD + SHIFT + P` (on Mac, on Windows press `CTRL + SHIFT + P`). Type following:

![](https://cdn-images-1.medium.com/max/1600/1*mn_M-LOK5a3hk6TTGuX-MA.png)

After this step, you should be redirected to the browser to sign in. When you do it, you should get a confirmation message and you should see your Azure cloud resources under the Azure extension. You should see your subscriptions:

![](https://cdn-images-1.medium.com/max/1600/1*iTcoNw5_3lXxR5QX-DGliA.png)

Next, hit “+” button and select “Create Function App in Azure”:

![](https://cdn-images-1.medium.com/max/1600/1*ZDHCxqmPhh12c5TWUoZ8hg.png)

Enter a name, I use `test-sgtm-func-app`. 

![](https://cdn-images-1.medium.com/max/1600/1*5ZCzEHD_hZS08Yg8LZiJ5A.png)

Then, select a runtime stack. I use the latest available node version which is `Node.js 18 LTS`.

![](https://cdn-images-1.medium.com/max/1600/1*JdPj0QvCygeFocRDnLihOQ.png)

After that, select a location where the new Function App will be hosted. **I recommend you to select the same location as for the Cosmos DB account.**

![](https://cdn-images-1.medium.com/max/1600/1*qEOt8JJqsodMfVDKgEboMw.png)

Next up: We’ll develop the function on your local machine and deploy it to Azure Cloud later. For this, you’ll need to create a new local workspace. You can find what is on picture below in the Azure extension at the bottom. 

![](https://cdn-images-1.medium.com/max/1600/1*Z8E88xYU6buFGxWkk0sI2A.png)

You’ll be sked to create a new project on your local machine. Select “Create new project” and then create / select your development folder on the local machine. It will ask you which language you want to use for development. Select Javascript. It will also ask you for the function version. Select **“Model V3”.** 

![](https://cdn-images-1.medium.com/max/1600/1*tCIEdz_pdHJbrlcbBxfo1A.png)

Afterwards, you will be prompted to select a coding template for the Azure Function. Select “HTTP Trigger”. After that, give your function a name. I use `getCosmosDoc`. Next, you’ll be prompted for “Authorization level”, select “Anonymous”. 

![](https://cdn-images-1.medium.com/max/1600/1*MSBrTRLhuGtEAMFszD6pfw.png)

New local project should be setup.

![](https://cdn-images-1.medium.com/max/1600/1*qgIqB4nArAxuU88vI5FRFQ.png)

![](https://cdn-images-1.medium.com/max/1600/1*iMS7HwxI0ede7aWeEFtC2A.png)

## 2.4. Coding

After you’ve completed the process, it is time to finally “get our hands dirty”. In the next parts, I’ll not only provide the code, but also take you through all the setup and I will explain what the code is doing. 

**Changing the configutation files**

Navigate to the `package.json` file and add following:

```js
"dependencies": {  
   "@azure/cosmos": "^3.17.3"  
}
```

The resulting file should look something like the `package.json` below. The name will be different for you as it is the name of the parent directory.

Now, go to `local.settings.json` file. Add the information that is missing. That is `“WEBSITE_NODE_DEFAULT_VERSION”:”~18"` and `“CosmosConnectionString”: “yourCosmosDBConnectionString”.`

To obtain the `“yourCosmosDbConnectionString”` you’ll have to go to Azure Cosmos DB account. Then, go to “Keys” and copy the “PRIMARY CONNECTION STRING” — replace the `“yourCosmosDbConnectionString”` with your connection string. 

![](https://cdn-images-1.medium.com/max/1600/1*4c6KkCwtC_7i_7tMDL1-cA.png)

In next piece of code, we’ll finaly get to the final `index.js` which is responsible for data retrieval from Cosmos DB. The code first imports the `"@azure/cosmos"`library. Then we create 2 helper functions:

1. `getContainer` — returns the container object from the Cosmos DB client
2. `createQuery` — runs data checks on the request inputs and returns data / error. 

Finally, we export the module where more of the data checks are performed. 

## 2.5. Debugging

In this part, we’ll focus on debugging the function directly in VS Code. Thus, we’ll verify if the code works on you local machine before deploying the function to production. 

> Note: Don’t forget to install the `"@azure/cosmos"` package before you start your function. Otherwise, an error may appear. To install the package, run `npm install @azure/cosmos` in the terminal.

You have basically 2 options on how to start debugging your function:

#### Option 1: 
Navigate to directory located above the directory where your `index.js` file is located. So my enitre path to the file is: `/Users/myUserName/Documents/Github/cloud-code/azure/azure-cosmos-db-test/getCosmosDoc/index.js`. Thus I will navigate myself to `azure-cosmos-db-test` folder. Now I’ll go to terminal and type:

```bash
cd ~ # move the to the base directory on your local machine  
cd Documents/Github/cloud-code/azure/azure-cosmos-db-test
```

After that, you should be in the correct directory:

![](https://cdn-images-1.medium.com/max/1600/1*NR6sVDwDMtMzFXesuVUZSw.png)

After this, you just type `func start` if you didn’t overwrite the contents of the `“scripts.start”` property of your `package.json` file.

#### Option 2: 
In VS Code, open (navigate to) your `index.js` file. Click on debugging icon on the left panel and click the start button:

![](https://cdn-images-1.medium.com/max/1600/1*Vkv3wtOcjhA96uI8hnY5Sg.png)

In either case, you should see something similar in your terminal (option 1) or debug console (option 2):

![](https://cdn-images-1.medium.com/max/1600/1*CR5n-prEEhm0Dz8avkuC-w.png)

Copy the testing URL, we’ll need it. We have several alternatives on how to make a request to the URL. You can either go with some online tool like [https://reqbin.com/](https://reqbin.com/), make a CURL request from the terminal or use tool like Postman. 

I will show you how to make the request both in postman and using terminal. Just note that even the function accepts GET requests (i didn’t change the default setting), we’ll use POST as we wouldn’t be able to pass a request body using GET request. 

In either case, the function relies on the request body which should have following structure:

```js
{  
  // fill in your Cosmos DB URL and Primary (or Secondary) Key  
  "endpoint": "https://my-cosmos-db-url.documents.azure.com:443/",  
  "key": "my-cosmos-db-primary-key",  
  "options": {  
    "database": "ToDoList",  
    "container": "Items",  
    "documentId": "document1"  
    // optional  
    "partitionKey": "document1PartitionKey",   
  }  
}
```

**Test the function using terminal**

For this, I’ve prepared a sample bash script which you can adjust to your needs and test the function. You just need to place there your own information.

**Test the function using Postman**

![](https://cdn-images-1.medium.com/max/1600/1*Rh8cv87SUFM3nocka_RP-w.png)