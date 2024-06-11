<script lang="ts">
    import RoleDetails from '$lib/components/RoleDetails.svelte'
    import Img from '$lib/components/Img.svelte';
    import Youtube from '$lib/components/Youtube.svelte';

    const lang = "en"
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
        eventClassification="Community meetup"
        eventTopic="Speech about server-side GTM use-cases for marketing evaluation"
        eventLocation="Brno, Czech Republic"
        eventDate="2024-03-13"
    />
You can find a recording for the presentation below. 
The video is available for Slovak and Czech speakers only.

<Youtube srcLink="https://www.youtube-nocookie.com/embed/BrvlIUvdncQ?si=wsrGqaqWRuWwP5BZ&amp;start=20"/>

The slides can be found on this [link](https://docs.google.com/presentation/d/1aju--ZQpLDNuz6VDuZYtcexNk-zupnBn1IQp8dWiVNw/edit?usp=sharing). Again, only for Slovak and Czech speakers only.
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
    eventTopic="Consulting BI for Marketing and Web Analytics topics"
    eventClassification="Marketing conference"
    eventLocation="Prague, Czech Republic"
    eventDate="2024-03-20"
/>
<section class="all-prose mb-4">
My first public consultancy experience. Two days of consulting, given plenty of recommendations. 

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