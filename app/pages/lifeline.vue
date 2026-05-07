<script setup lang="ts">
import type { TimelineItem } from '@nuxt/ui'
import { useTimeAgo } from '@vueuse/core'

const { data: page } = await useAsyncData('lifeline-page', () => {
  return queryCollection('pages').path('/lifeline').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: lifeline } = await useAsyncData('lifeline', () => {
  return queryCollection('lifeline').all()
})

const { global } = useAppConfig()

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description
})

const items = [
  {
    username: 'J-Michalek',
    date: '2025-05-24T14:58:55Z',
    action: 'opened this',
    avatar: {
      src: 'https://github.com/J-Michalek.png',
      loading: 'lazy' as const
    }
  },
  {
    username: 'J-Michalek',
    date: '2025-05-26T19:30:14+02:00',
    action: 'marked this pull request as ready for review',
    icon: 'i-lucide-check-circle'
  },
  {
    username: 'benjamincanac',
    date: '2025-05-27T11:01:20Z',
    action: 'commented on this',
    description:
      "I've made a few changes, let me know what you think! Basically I updated the design, removed unnecessary divs, used Avatar component for the indicator since it supports icon already.",
    avatar: {
      src: 'https://github.com/benjamincanac.png',
      loading: 'lazy' as const
    }
  },
  {
    username: 'J-Michalek',
    date: '2025-05-27T11:01:20Z',
    action: 'commented on this',
    description: 'Looks great! Good job on cleaning it up.',
    avatar: {
      src: 'https://github.com/J-Michalek.png',
      loading: 'lazy' as const
    }
  },
  {
    username: 'benjamincanac',
    date: '2025-05-27T11:01:20Z',
    action: 'merged this',
    icon: 'i-lucide-git-merge'
  }
] satisfies TimelineItem[]
</script>

<!-- <template>
  <div>Работает!</div>
</template> -->

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        v-for="(project, index) in lifeline"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UTimeline
          :items="items"
          size="xs"
          :ui="{
            date: 'float-end ms-1',
            description: 'px-3 py-2 ring ring-default mt-2 rounded-md text-default'
          }"
          class="w-96"
        >
          <template #title="{ item }">
            <span>{{ item.username }}</span>
            <span class="font-normal text-muted">&nbsp;{{ item.action }}</span>
          </template>

          <template #date="{ item }">
            {{ useTimeAgo(new Date(item.date)) }}
          </template>
        </UTimeline>
      </Motion>
    </UPageSection>
  </UPage>
</template>
