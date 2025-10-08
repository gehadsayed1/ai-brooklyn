import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginWithGoogleStore } from '../stores/LoginWithGoogle';

export function useAccessControl() {
  const router = useRouter();
  const loginStore = useLoginWithGoogleStore();

  const hasAccess = computed(() => loginStore.checkBotAccess());
  const accessInfo = computed(() => loginStore.checkAccessExpiry());

  const redirectBasedOnAccess = () => {
    if (!hasAccess.value) {
      // إذا لم يكن لديه access، يرجع للـ home
      router.push('/');
      return false;
    }
    return true;
  };

  const shouldShowExpiryWarning = computed(() => {
    if (!accessInfo.value) return false;
    return accessInfo.value.isExpiringSoon && !accessInfo.value.isExpired;
  });

  const isAccessExpired = computed(() => {
    if (!accessInfo.value) return false;
    return accessInfo.value.isExpired;
  });

  return {
    hasAccess,
    accessInfo,
    redirectBasedOnAccess,
    shouldShowExpiryWarning,
    isAccessExpired,
  };
}
