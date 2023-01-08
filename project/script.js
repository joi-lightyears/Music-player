const song = document.querySelector('#song')
const playBtn = document.querySelector('.play-inner')
const nextBtn = document.querySelector('.play-forward')
const backBtn = document.querySelector('.play-back')
const currTime = document.querySelector('.currentTime')
const durationTime = document.querySelector('.duration')
const songBar = document.querySelector('.song-bar')
const shuffleBtn = document.querySelector('.shuffleBtn')
const repeatBtn = document.querySelector('.repeatBtn')
const songName = document.querySelector('.song-name')

let isPlaying = true
let isShuffle = false

let indexSong = 0
let indexRepeat = 0

// const repeatStatus = [0,1,2] //0: lay once time, 1: repeat whole playlist, 2: repeat a song
const repeatStatus=[
    {
        id: 0,
    },
    {
        id: 1,
        className: 'playlistRepeat'
    },
    {
        id: 2,
        className: 'songRepeat'
    }
]
let repeat = repeatStatus[indexRepeat].id


const playlist = [
    {
        id: 1,
        title: 'Nu Cuoi Em La Nang',
        file: 'nuCuoiEmLaNang.mp3',
    },
    {
        id: 2,
        title: 'Em La Nhat',
        file: 'emLaNhat.mp3',
    },
    {
        id: 3,
        title: 'Mat Moc',
        file: 'matmoc.mp3',
    },
    {
        id: 4,
        title: 'Hinh Nhu Ta Thich Nhau',
        file: 'hinhNhuTaThichNhau.mp3',
    },
    {
        id: 5,
        title: 'Tinh Ca Tinh Ta',
        file: 'tinhCaTinhTa.mp3',
    }
]
let time = setInterval(timer, 500)
song.addEventListener('ended', handleEndedSong)
function handleEndedSong(){
    if (repeat===0) // just play 1 song
    {
        playPause()
    }else if(repeat===1) // repeat whole playlist
    {
        changeSong(1)
    }else if(repeat===2){ // repeat 1 song
        changeSong(0)
    }
}
timer()
// first song when reload
function init(){
    song.setAttribute('src', `./mp3/${playlist[indexSong].file}`)
    songName.innerHTML = playlist[indexSong].title
}
init()

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
    song.setAttribute('src', `./mp3/${playlist[indexSong].file}`)
    songName.innerHTML = playlist[indexSong].title
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

// repeat song
repeatBtn.addEventListener('click', handleRepeat)
function handleRepeat(){
    indexRepeat++
    if(indexRepeat===repeatStatus.length)
    {
        indexRepeat=0
    }
    repeatBtn.className ='repeatBtn md hydrated'
    repeatBtn.classList.add(repeatStatus[indexRepeat].className)
    repeat=repeatStatus[indexRepeat].id
    console.log(indexRepeat)
}

// shuffle
shuffleBtn.addEventListener('click', handleShuffle)
function handleShuffle(){
}