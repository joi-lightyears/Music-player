const song = document.querySelector('#song')
// const tempSong = document.querySelector('#tempSong')
const playBtn = document.querySelector('.play-inner')
const nextBtn = document.querySelector('.play-forward')
const backBtn = document.querySelector('.play-back')
const currTime = document.querySelector('.currentTime')
const durationTime = document.querySelector('.duration')
const songBar = document.querySelector('.song-bar')
const shuffleBtn = document.querySelector('.shuffleBtn')
const repeatBtn = document.querySelector('.repeatBtn')
const songName = document.querySelector('.song-name')
const listBar = document.querySelector('.list-bar')
const musicList = document.querySelector('.music-list')
const songNameList = musicList.querySelector('.song-name-list')
const authorList = musicList.querySelector('.author-list')
const listWrapper = musicList.querySelector('.list-wrapper')
const closeBtn = musicList.querySelector('.closeBtn')

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
        title: 'Anh Se Don Em',
        file: 'anhSeDonEm.mp3',
    },
    {
        id: 2,
        title: 'Tinh Ca Tinh Ta',
        file: 'tinhCaTinhTa.mp3',
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
        title: 'Em La Nhat',
        file: 'emLaNhat.mp3',
    },
    {
        id: 6,
        title: 'Nu Cuoi Em La Nang',
        file: 'nuCuoiEmLaNang.mp3',
    },
    {
        id: 7,
        title: 'Collide',
        file: 'collide.mp3',
    },
    {
        id: 8,
        title: 'Em Khong Hieu',
        file: 'emKhongHieu.mp3',
    },
    {
        id: 9,
        title: 'Mashup Hit TikTok',
        file: 'MashupHitTikTok.mp3',
    },
    {
        id: 10,
        title: 'Chan Ai Masked',
        file: 'chanAiOSen.mp3',
    },
    {
        id: 11,
        title: 'Da Vu Masked',
        file: 'daVuMasked.mp3',
    }
]
let time = setInterval(timer, 500)
song.addEventListener('ended', handleEndedSong)
function handleEndedSong(){
    if (repeat===0 && !isShuffle) // just play 1 song
    {
        playPause()
    }else if(repeat===1 || (repeat===0 && isShuffle)) // repeat whole playlist
    {
        changeSong(1)
    }else if(repeat===2){ // repeat 1 song
        changeSong(0)
    }
}
playlist.forEach((songList)=>{
    let fileTemp = songList.file.slice(0,-4)
    // tempSong.setAttribute('src',' ')
    let liTag = `
    <li class="song-list ${songList.id}_${fileTemp}">
        <div class="row">
            <span class="song-name-list ">${songList.title}</span>
            <div class="author-list">Thanh Dat</div>
        </div>
        <span class="duration-list}">...</span>
    </li>
    `
    listWrapper.insertAdjacentHTML('beforeEnd',liTag)
    // tempSong.setAttribute('src',`./mp3/${songList.file}`)
    // let liSongDur = listWrapper.querySelector(`.${fileTemp}`)
    // tempSong.addEventListener('loadedmetadata',()=>{
    //     liSongDur.textContent = formatTimer(tempSong.duration)
    // })
    

    // liSongAudio.addEventListener('loadeddata',()=>{

    // })
    // const durr = formatTimer(liSongAudio.duration)

    // liSongDur.textContent = durr

})
const songList = musicList.querySelectorAll('.song-list')

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
function random(){
    return Math.floor(Math.random() * playlist.length)
}
function changeSong(pos){
    if(pos===1 && !isShuffle){
        indexSong++
        if(indexSong>=playlist.length){
            indexSong=0
        }
    }else if(pos===1 && isShuffle){
        let tempIndex = indexSong
        while(indexSong===tempIndex){
            indexSong = random()
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
    if(isShuffle){
        handleShuffle()
    }
    indexRepeat++
    if(indexRepeat===repeatStatus.length)
    {
        indexRepeat=0
    }
    repeatBtn.className ='repeatBtn md hydrated'
    repeatBtn.classList.add(repeatStatus[indexRepeat].className)
    repeat=repeatStatus[indexRepeat].id
}

// shuffle
shuffleBtn.addEventListener('click', handleShuffle)
function handleShuffle(){
    if(isShuffle){ //disable shuffle
        shuffleBtn.classList.toggle('activeShuffle')
        isShuffle=false
    }else{ //play shuffle
        shuffleBtn.classList.toggle('activeShuffle')
        isShuffle=true
        //reset repeat when choose shuffle
        indexRepeat=0
        repeatBtn.className ='repeatBtn md hydrated'
        repeat=repeatStatus[indexRepeat].id
    }
}

// show music list
listBar.addEventListener('click', handleShow)
function handleShow(){
    musicList.classList.toggle('show')
}
closeBtn.addEventListener('click',handleClose)
function handleClose(){
    musicList.classList.toggle('show')
}
songList.forEach((sol)=>{
    sol.addEventListener('click', ()=>handleOption(sol))
})
function handleOption(sol){
    const infoId = sol.className.split(' ')[1].split('_')[0]
    indexSong=infoId-1
    changeSong(0)

}