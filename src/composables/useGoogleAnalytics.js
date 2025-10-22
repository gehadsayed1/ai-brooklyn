import { onMounted } from 'vue'

// Google Analytics ID
const GA_MEASUREMENT_ID = 'G-DPH73Z0H69'

// Initialize Google Analytics
export function useGoogleAnalytics() {
  // Function to track page views
  const trackPageView = (pagePath) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pagePath
      })
    }
  }

  // Function to track custom events
  const trackEvent = (eventName, parameters = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters)
    }
  }

  // Function to track button clicks
  const trackButtonClick = (buttonName, location = '') => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location
    })
  }

  // Function to track form submissions
  const trackFormSubmission = (formName) => {
    trackEvent('form_submit', {
      form_name: formName
    })
  }

  // Function to track downloads
  const trackDownload = (fileName) => {
    trackEvent('file_download', {
      file_name: fileName
    })
  }

  // Function to track scroll depth
  const trackScrollDepth = (depth) => {
    trackEvent('scroll', {
      scroll_depth: depth
    })
  }

  // Function to track time on page
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

// Auto-initialize Google Analytics when the composable is imported
onMounted(() => {
  // Load Google Analytics script if not already loaded
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
