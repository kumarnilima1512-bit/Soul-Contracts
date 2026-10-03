<script setup lang="ts">
interface Testimonial {
  id: string
  name: string
  category: string
  quote: string
  rating: number
  createdAt: string
}

const password = ref('')
const authenticated = ref(false)
const authError = ref('')

const testimonials = ref<Testimonial[]>([])
const loading = ref(false)
const deletingId = ref<string | null>(null)

const checkPassword = async () => {
  authError.value = ''
  loading.value = true
  try {
    const result = await $fetch<Testimonial[]>('/api/testimonials')
    testimonials.value = result
    authenticated.value = true
  } catch {
    authError.value = 'Something went wrong loading reviews.'
  } finally {
    loading.value = false
  }
}

const deleteReview = async (id: string) => {
  if (!confirm('Delete this review permanently?')) return

  deletingId.value = id
  try {
    await $fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-password': password.value },
    })
    testimonials.value = testimonials.value.filter((t) => t.id !== id)
  } catch {
    alert('Failed to delete — check your admin password.')
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#1E1424] font-sans px-6 py-16">
    <div class="max-w-3xl mx-auto">
      <h1 class="font-serif text-2xl text-[#F7F1E8] mb-8">Admin — Manage Reviews</h1>

      <div v-if="!authenticated" class="max-w-sm">
        <label class="text-xs uppercase tracking-wide text-[#8C7A9C] mb-2 block">Admin Password</label>
        <input
          v-model="password"
          type="password"
          @keyup.enter="checkPassword"
          class="w-full bg-[#2A1D33] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-[#F7F1E8] mb-4"
        />
        <button
          @click="checkPassword"
          class="bg-[#D9A65C] text-[#1E1424] font-medium px-5 py-2 rounded-full text-xs"
        >
          View Reviews
        </button>
        <p v-if="authError" class="text-xs text-[#D9A5A0] mt-3">{{ authError }}</p>
      </div>

      <div v-else class="flex flex-col gap-4">
        <p class="text-sm text-[#8C7A9C] mb-2">{{ testimonials.length }} review(s) total</p>

        <div
          v-for="t in testimonials"
          :key="t.id"
          class="bg-[#2A1D33] border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4"
        >
          <div>
            <p class="text-sm text-[#F7F1E8] font-medium mb-1">{{ t.name }} &middot; {{ t.category }} &middot; {{ t.rating }}★</p>
            <p class="text-sm text-[#C9BFAF]">{{ t.quote }}</p>
          </div>
          <button
            @click="deleteReview(t.id)"
            :disabled="deletingId === t.id"
            class="shrink-0 text-xs text-[#D9A5A0] border border-[#D9A5A0]/40 rounded-full px-4 py-1.5 hover:bg-[#D9A5A0]/10 transition-colors duration-200 disabled:opacity-50"
          >
            {{ deletingId === t.id ? 'Deleting...' : 'Delete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>