//---

var giliran = 0, game = 0, count = 0; //0 user, 1 bot
var mode = 1;//1 circle, 2 cross
const is_checked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//---
function changeMode(a)
{
    if(game == 0) 
    {
        if(a == 1)
        {
            document.querySelector('.o').style.color = "rgb(159, 123, 123)";
            document.querySelector('.x').style.color = "rgb(114, 114, 114)";
            mode = a;
        }
        else 
        {
            document.querySelector('.x').style.color = "rgb(159, 123, 123)";
            document.querySelector('.o').style.color = "rgb(114, 114, 114)";
            mode = a;
        }
    }
}
//---
function start()
{
    if(game == 0) game = 1;
    else alertEx("Anda harus men-refresh page ini untuk bermain kembali.");
}
//---
function getModeString(who)//1 player, 2 bot
{
    if(who == 1)
    {
        if(mode == 1) return "o";
        else return "x";
    }
    else
    {
        if(mode == 1) return "x";
        else return "o";
    }
}
//---
function klik(num)
{   
    if(giliran == 0 && game == 1 && is_checked[num] == 0)
    {
        if(num == 1)
            document.querySelector('.piece-left-top').innerHTML = getModeString(1);
        else if(num == 2)
            document.querySelector('.piece-center-top').innerHTML = getModeString(1);
        else if(num == 3)
            document.querySelector('.piece-right-top').innerHTML = getModeString(1);
        else if(num == 4)
            document.querySelector('.piece-left-center').innerHTML = getModeString(1);
        else if(num == 5)
            document.querySelector('.piece-center-center').innerHTML = getModeString(1);
        else if(num == 6)
            document.querySelector('.piece-right-center').innerHTML = getModeString(1);
        else if(num == 7)
            document.querySelector('.piece-left-bottom').innerHTML = getModeString(1);
        else if(num == 8)
            document.querySelector('.piece-center-bottom').innerHTML = getModeString(1);
        else if(num == 9)
            document.querySelector('.piece-right-bottom').innerHTML = getModeString(1);
        //---
        giliran = 1;
        is_checked[num] = 1;
        count++;
        onGameUpdate(1);
    }
    //---
    if(count >= 9 && game == 1)
    {
        game = 2;
        setTimeout(onGameDone(1), 500);
    }
    else setTimeout(BotJalan, 1000);
}
//---
function BotJalan()
{
    if(giliran == 1 && game == 1)
    {
        while(true)
        {
            var num = Math.floor(Math.random() * 9 + 1);
            if(is_checked[num] == 0)
            {
                if(num == 1)
                    document.querySelector('.piece-left-top').innerHTML = getModeString(2);
                else if(num == 2)
                    document.querySelector('.piece-center-top').innerHTML = getModeString(2);
                else if(num == 3)
                    document.querySelector('.piece-right-top').innerHTML = getModeString(2);
                else if(num == 4)
                    document.querySelector('.piece-left-center').innerHTML = getModeString(2);
                else if(num == 5)
                    document.querySelector('.piece-center-center').innerHTML = getModeString(2);
                else if(num == 6)
                    document.querySelector('.piece-right-center').innerHTML = getModeString(2);
                else if(num == 7)
                    document.querySelector('.piece-left-bottom').innerHTML = getModeString(2);
                else if(num == 8)
                    document.querySelector('.piece-center-bottom').innerHTML = getModeString(2);
                else if(num == 9)
                    document.querySelector('.piece-right-bottom').innerHTML = getModeString(2);
                //---
                giliran = 0;
                is_checked[num] = 2;
                count++;
                onGameUpdate(2);
                //---
                break;
            }
        }
    }
}
//---
function onGameDone(type, winner=0)//1 no one win, 2 win
{
    if(type == 2)
    {
        if(winner == 1)//player
            alertEx("Player memenangkan permainan.");
        else //bot
            alertEx("Bot memenangkan permainan.");
    }
    else alertEx("Game sudah selesai dan tidak ada yang menang.");
}
//---
function onGameUpdate(num)//1 player, 2 bot
{
    if(DetectWin(num) == 1)
    {
        game = 2;
        onGameDone(2, num);
    }
}
//---
function DetectWin(num)
{
    if(is_checked[1] == num && is_checked[2] == num && is_checked[3] == num) 
    {
        document.querySelector('.line-horizontal-top').style.display = "block";
        return 1;
    }
    if(is_checked[4] == num && is_checked[5] == num && is_checked[6] == num) 
    {
        document.querySelector('.line-horizontal-center').style.display = "block";
        return 1;
    }
    if(is_checked[7] == num && is_checked[8] == num && is_checked[9] == num)
    {
        document.querySelector('.line-horizontal-bottom').style.display = "block";
        return 1;
    }
    //---
    if(is_checked[1] == num && is_checked[4] == num && is_checked[7] == num) 
    {
        document.querySelector('.line-vertical-left').style.display = "block";
        return 1;
    }
    if(is_checked[2] == num && is_checked[5] == num && is_checked[8] == num) 
    {
        document.querySelector('.line-vertical-center').style.display = "block";
        return 1;
    }
    if(is_checked[3] == num && is_checked[6] == num && is_checked[9] == num) 
    {
        document.querySelector('.line-vertical-right').style.display = "block";
        return 1;
    }
    //---
    if(is_checked[1] == num && is_checked[5] == num && is_checked[9] == num) 
    {
        document.querySelector('.line-cross-left').style.display = "block";
        return 1;
    }
    if(is_checked[3] == num && is_checked[5] == num && is_checked[7] == num) 
    {
        document.querySelector('.line-cross-right').style.display = "block";
        return 1;
    }

    return 0;
}
//---
function alertEx(text) {setTimeout(function() { alert(text) }, 1000);}