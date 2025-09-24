// Countdown_Timer
if (!customElements.get('countdown-timer')) {
  customElements.define('countdown-timer', class CountdownTimer extends HTMLElement {
    constructor() {
      super();
      const endDate = new Date(this.getAttribute('end-date'));
      if (isNaN(endDate)) {
        this.classList.add('hidden');
        const message = this.nextElementSibling;
        if(!message || !message.classList.contains('countdown-timer_message')) return;
        message.classList.remove('hidden');
        return;
      } else {
        const remainingTime = endDate.getTime() - Date.now();
        if (remainingTime <= 0) {
          this.innerHTML = `<div class="block"><span class="time">0</span><span class="text">${window.additionalStrings.countdown_days_label}</span></div><div class="block"><span class="time">0</span><span class="text">${window.additionalStrings.countdown_hours_label}</span></div><div class="block"><span class="time">0</span><span class="text">${window.additionalStrings.countdown_min_label}</span></div><div class="block"><span class="time">0</span><span class="text">${window.additionalStrings.countdown_sec_label}</span></div>`;
        } else {
          this.remainingTime = remainingTime;
          this.innerHTML = this.getTimeString();
        }
      }
    }

    connectedCallback() {
      if (isNaN(this.remainingTime)) {
        this.classList.add('hidden');
        const message = this.nextElementSibling;
        if(!message || !message.classList.contains('countdown-timer_message')) return;
        message.classList.remove('hidden');
        return;
      }
      this.intervalId = setInterval(() => {
        this.remainingTime -= 1000;
        this.innerHTML = this.getTimeString();
        if (this.remainingTime <= 0) {
          clearInterval(this.intervalId);
          this.dispatchEvent(new Event('timeup'));
        }
      }, 1000);
    }

    getTimeString() {
      if (isNaN(this.remainingTime) || this.remainingTime <= 0) {
        this.classList.add('hidden');
        const message = this.nextElementSibling;
        if(!message || !message.classList.contains('countdown-timer_message')) return;
        message.classList.remove('hidden');
        return;
      }
      const days = Math.floor(this.remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor((this.remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((this.remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((this.remainingTime % (1000 * 60)) / 1000);
      return `<div class="block"><span class="time">${days}</span><span class="text">${window.additionalStrings.countdown_days_label}</span></div><div class="block"><span class="time">${hours}</span><span class="text">${window.additionalStrings.countdown_hours_label}</span></div><div class="block"><span class="time">${minutes}</span><span class="text">${window.additionalStrings.countdown_min_label}</span></div><div class="block"><span class="time">${seconds}</span><span class="text">${window.additionalStrings.countdown_sec_label}</span></div>`;
    }
  });
}