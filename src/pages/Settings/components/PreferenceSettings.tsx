const timezones = Intl.DateTimeFormat().resolvedOptions().timeZone;

const handleTimezoneChange = (zone: string) => {
  // Handle timezone change
  console.log('Timezone changed to:', zone);
}; 