const song = document.querySelector('#song')
const playBtn = document.querySelector('.play-inner')
const nextBtn = document.querySelector('.play-forward')
const backBtn = document.querySelector('.play-back')
const currTime = document.querySelector('.currentTime')
const durationTime = document.querySelector('.duration')
const songBar = document.querySelector('.song-bar')

let isPlaying = true
let indexSong = 0

const playlist= ['nuCuoiEmLaNang.mp3', 'emLaNhat.mp3', 'matmoc.mp3', 'hinhNhuTaThichNhau.mp3', 'tinhCaTinhTa.mp3' ]

song.setAttribute('src', `./mp3/${playlist[indexSong]}`)
song.addEventListener('ended', handleEndedSong)
function handleEndedSong(){
    changeSong(1)
}
timer()
let time = setInterval(timer, 500)


// play-pause
playBtn.addEventListener("click", playPause)
function playPause(){
    if(isPlaying){
        song.play()
        playBtn.innerHTML = `<ion-icon name="pause" class="play"></ion-icon>`
        isPlaying=false
        time = setInterval(timer, 500)
    }else{
        song.pause()
        playBtn.innerHTML = `<ion-icon name="play" class="play"></ion-icon>`
        isPlaying=true
        clearInterval(time)
    }
}

// next-back
nextBtn.addEventListener("click",function(){
    changeSong(1)
})
backBtn.addEventListener("click",function(){
    changeSong(-1)
})
function changeSong(pos){
    if(pos===1){
        indexSong++
        if(indexSong>=playlist.length){
            indexSong=0
        }
    }else if(pos===-1){
        indexSong--
        if(indexSong<0){
            indexSong=playlist.length - 1
        }
    }
    isPlaying=true
    song.setAttribute('src', `./mp3/${playlist[indexSong]}`)
    playPause()
}

// timer
function timer(){
    const {duration, currentTime} = song
    songBar.max = duration
    songBar.value = currentTime
    currTime.textContent = formatTimer(currentTime)
    if(!duration){
        durationTime.textContent='00:00'
    }else{
        durationTime.textContent = formatTimer(duration)
    }
}
function formatTimer(num){
    const minutes = Math.floor(num / 60)
    const second = Math.floor(num - (minutes * 60))
    return `${minutes < 10? '0' + minutes: minutes}:${second < 10? '0' + second: second}`
}

// play bar
songBar.addEventListener('change', handleChange)
function handleChange(){
    song.currentTime = songBar.value
}