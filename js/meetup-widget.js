// Twine state object that will be populated with events
var context = {};

(() => {
  // Fetch meetup events json from glitch app
  const api = 'https://videumcodeup-meetup-widget.glitch.me'

  // Helpers
  const byTimeAsc = (a, b) => a.time < b.time
  const isUpcoming = event => event.status === 'upcoming'
  const isPast = event => event.status == 'past'

  // Promises containing events
  const allEvents = fetch(`${api}/upcoming_meetups`)
    .then(response => response.json())

  const upcomingEvents = allEvents
    .then(events => events)
    .then(events => events.filter(isUpcoming))

  const pastEvents = allEvents
    .then(events => events.filter(isPast))
    .then(events => events.sort(byTimeAsc))

  const nextEvent = upcomingEvents.then(events => events[0])
  const lastEvent = pastEvents.then(events => events[0])

  // Wait for events data to be ready
  Promise.all([nextEvent, lastEvent])
    .then(([upcoming, past]) => { // Rename the data a little bit
      context.events = { upcoming, past }
    })
    .catch(error => {
      console.error(error)
      /* Discard error so the next chain always is called */
    })
    .then(() => {
      Twine.reset(context).bind().refresh();
    })
})()
