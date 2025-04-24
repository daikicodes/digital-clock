let wakeLock = null;

async function requestWakeLock() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock requested.');

    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock released.');
      wakeLock = null;
    });
  } catch (err) {
    console.error(`Error while requering Wake Lock: ${err}`);
  }
}

async function releaseWakeLock() {
  if (wakeLock) {
    await wakeLock.release();
    wakeLock = null;
  }
}



function updateTime() {
    // Update time
    const time = new Date();
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    // Update week days
    const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const todayIndex = time.getDay();
    const today = weekDays[todayIndex];
    const weekday = document.querySelectorAll('.weekday');
    weekday.forEach(element => {
        element.classList.remove('active');
        if (element.textContent === today) {
            element.classList.add('active');
        }
    });

    // Update page title
    const dayPeriod = function() {
        const currentHour = time.getHours();
        if (currentHour >= 0 && currentHour < 6) {
            return 'Good evening! 😴';
        } else if (currentHour >= 6 && currentHour < 12) {
            return 'Good morning! ☕';
        } else if (currentHour >= 12 && currentHour < 19) {
            return 'Good afternoon! ☀️';
        } else {
            return 'Good night! 🌙';
        }
    };

    document.title = `${hours}:${minutes} — ${dayPeriod()}`;
}

updateTime();
setInterval(updateTime, 1000);

// activate Wake Lock when page is focused
window.addEventListener('focus', requestWakeLock);

// release Wake Lock when page loses focus
window.addEventListener('blur', releaseWakeLock);
