let ably = new Ably.Realtime('i6lHRw.lCewIA:tavzLo-ZM53EW6ua');

async function asyncMain() {
    let chanName = '[product:ably-openweathermap/weather?rewind=1]weather:2643741';
    let channel = ably.channels.get(chanName);
    console.log("here");
    channel.subscribe(function(message) {
        console.log(message.data);
    });
}

asyncMain();