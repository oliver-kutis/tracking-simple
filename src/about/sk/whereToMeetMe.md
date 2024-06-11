<script lang="ts">
    import RoleDetails from '$lib/components/RoleDetails.svelte'
    import Img from '$lib/components/Img.svelte';
    import Youtube from '$lib/components/Youtube.svelte';

    let player
    let ytPlayerId = "BrvlIUvdncQ";
    const toggle = () => {
        console.log('changing video id')
        player.loadVideoById(ytPlayerId);
    }
    const lang = 'sk'
</script>

<span class="divider mb-2 print:mb-0" />

<section class="all-prose mb-4">
    <RoleDetails
        lang={lang} 
        position=""
        company=""
        startDate=""
        endDate=""
        eventName="Frontendisti"
        eventClassification="Stretnutie komunity"
        eventTopic="Prednáška ku server-side GTM a use-caseom pre vyhodnocovanie marketingových aktivít"
        eventLocation="Brno, Česká Republika"
        eventDate="2024-03-13"
    />
Video z prezentácie nájdete nižšie.

<Youtube srcLink="https://www.youtube-nocookie.com/embed/BrvlIUvdncQ?si=wsrGqaqWRuWwP5BZ&amp;start=20"/>

Samotnú prezentáciu nájdete na tomto [odkaze](https://docs.google.com/presentation/d/1aju--ZQpLDNuz6VDuZYtcexNk-zupnBn1IQp8dWiVNw/edit?usp=sharing). 
</section>
<!-- <div id="neededforhmr"><div id={ytPlayerId} /><Youtube bind:player></Youtube></div>
 -->

<span class="divider mb-2 print:mb-0" />

<RoleDetails
    lang={lang}
    position=""
    company=""
    startDate=""
    endDate=""
    eventName="Czech Online Expo"
    eventTopic="Konzultácia BI pre marketingové účely a webovej analytiky"
    eventClassification="Marketing conference"
    eventLocation="Prague, Czech Republic"
    eventDate="2024-03-20"
/>
<section class="all-prose mb-4">
Moja prvá skúsenosť v roli konzultanta na konferencii. Dva dni konzultácií a rozdanie množstva rád.

<div class="flex justify-center">
<Img class="coe-2024" src="/img/whereToMeetMe/czech-online-expo-2024.jpeg" alt="A photo from the conference."/>
</div>
</section>

<style>
    :global(img.coe-2024) {
        width: 75% !important;
        height: 75% !important;
    }
    @media (min-width: 640px) {
        :global(img.coe-2024) {
            width: 50% !important;
            height: 50% !important;
        }
    }
</style>