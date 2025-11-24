import { onMounted } from 'vue'

const GA_MEASUREMENT_ID = 'G-DPH73Z0H69'

export function useGoogleAnalytics() {
  const trackPageView = (pagePath) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pagePath
      })
    }
  }

  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  }

  const trackButtonClick = (buttonName, location = '') => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location
    })
  }

  const trackFormSubmission = (formName) => {
    trackEvent('form_submit', {
      form_name: formName
    })
  }

  const trackDownload = (fileName) => {
    trackEvent('file_download', {
      file_name: fileName
    })
  }

  const trackScrollDepth = (depth) => {
    trackEvent('scroll', {
      scroll_depth: depth
    })
  }

  const trackTimeOnPage = (timeInSeconds) => {
    trackEvent('timing_complete', {
      name: 'page_load_time',
      value: timeInSeconds
    })
  }

  return {
    trackPageView,
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackDownload,
    trackScrollDepth,
    trackTimeOnPage
  }
}

onMounted(() => {
  if (typeof window !== 'undefined' && !window.gtag) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script)

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      function gtag() { window.dataLayer.push(arguments) }
      window.gtag = gtag
      gtag('js', new Date())
      gtag('config', GA_MEASUREMENT_ID)
    }
  }
})
