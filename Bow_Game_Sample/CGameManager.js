/**
 * Created by Ronen Tsamir.
 * Date: 10/12/11
 * Time: 23:30
 */
CGameManager=function()
{
    DisplayObject.Sprite.call(this);

    var mBowMan = new BowMan();
    this.explo = new DisplayObject.ImageLoader("assets/Sprites/explosion.png");
    this.explo.cols = 4;
    this.explo.totalframes =8;
    this.explo.width = 71;
    this.explo.height = 100;
    this.mTargets = Array();
    this.mNumOfShoots = 0;
    this.mMovementDirection = -0.01;
    this.mMovementSpeed = 0;;
    this.mIsPaused = false;
    this.mEndGameTimeOutId = -1;
    var mMouseX = 0;
    var mMouseY = 0;
    Arrow.ArrowsList = new Array();
    var mAudioSaport = true;
    var mExplosionSounds;
    var mBowSound;
    var mCurrentExplosionSound;


    //_______________________________________________________________________________

    this.setSound = function()
    {
        var soundType = "mp3"
       if(navigator.userAgent.indexOf("irefox") > 0);
            soundType = "wav"

         try {
         mExplosionSounds = [new Audio("assets/Sound/explosion."+soundType),new Audio("assets/Sound/explosion."+soundType),new Audio("assets/Sound/explosion."+soundType),new Audio("assets/Sound/explosion."+soundType)];
         } catch(e) {
             mAudioSaport = false;
         }
         mCurrentExplosionSound = 0;

         if(mAudioSaport)
            mBowSound = new Audio("assets/Sound/bow."+soundType);
    }
    //_______________________________________________________________________________
    this.setSound();
    this.initGame= function()
    {
        mBowMan.x = 46;
        mBowMan.y = 365;

        this.addChild(mBowMan);
        for (var r =0; r <  5; r++)
        {
             for (var c =0; c < 7 - (r/2); c++)
             {
                var aTarget;
                if(this.mTargets.length > 1)
                   aTarget = this.mTargets[0].clone();
                else
                    aTarget = new DisplayObject.ImageLoader("assets/Sprites/beholder.png")
                aTarget.currentframe = Math.round(Math.random()*7)
                aTarget.x =100 + c * 80 + r * 40;
                aTarget.y =  10 + r*80;
                this.addChild(aTarget);
                this.mTargets .push( aTarget);
            }
        }
    }
    //_______________________________________________________________

    this.shoot = function()
    {
        if (this.mIsPaused)
            return;
        var aArrow =  mBowMan.shoot();
        if(aArrow == null)
            return;
        if(mAudioSaport)
            mBowSound.play();
        this.addChild(aArrow);
        Arrow.ArrowsList.push(aArrow);
        this.mNumOfShoots++;
    }
    //_______________________________________________________________

    this.mouseMove = function(ev)
    {
        if( ev.offsetX != null)
        {
            mMouseX = ev.offsetX;
            mMouseY = ev.offsetY;
        }
        else
        {
            mMouseX = ev.clientX;
            mMouseY = ev.clientY;
        }

    }
        //_______________________________________________________________

    this.endGame = function()
    {
        graphics.fillStyle    = '#cc4400';
        graphics.font         = 'bold 40px sans-serif';
        graphics.textBaseline = 'top';
        graphics.fillText  ('               Congratulations', 10, 70);
        graphics.fillText  ('   you bombed out all the monsters', 10, 140);
        graphics.fillStyle    = '#ff3300';
        graphics.fillText( "     You did it with only " + mGameManager.mNumOfShoots + " arrows", 10, 220);
        mGameManager.mIsPaused = true;
        clearTimeout(mGameManager.mEndGameTimeOutId);
        mGameManager.mEndGameTimeOutId = -1;
    }
    //_______________________________________________________________

    this.gameLoop = function()
    {
        if (this.mIsPaused)
            return;
        if((this.mTargets.length == 0)&&(this.mEndGameTimeOutId < 0))
             this.mEndGameTimeOutId = setTimeout(this.endGame,1000);

        graphics.clearRect(0,0,700,490);
        this.mMovementSpeed += this.mMovementDirection;
        if(this.mMovementSpeed > 1)
            this.mMovementDirection = -0.01;
        if(this.mMovementSpeed < -1)
            this.mMovementDirection = 0.01;
        for(var tr=0; tr <  this.mTargets.length; tr++)
        {
            this.mTargets[tr].x += this.mMovementSpeed;
            this.mTargets[tr].rotation = this.mMovementSpeed / 17;
        }

        graphics.fillStyle    = '#00';
        graphics.font         = 'bold 30px sans-serif';
        graphics.textBaseline = 'top';
        graphics.fillText  ('Arrow Number :', 10, 450);

        graphics.lineWidth   =2;
        graphics.strokeStyle = '#bb5500';
        graphics.font         = 'bold 30px sans-serif';
        graphics.strokeText( this.mNumOfShoots, 260, 450);

        mBowMan.setAngle(mMouseX, mMouseY)
        this.draw();
        for(var i=0; i <  Arrow.ArrowsList.length;i++)
        {
            if(this. chackCollision(Arrow.ArrowsList[i]))
            {
                this.playExplosionSound();
                //this.removeChild(this.mArrows[i])
                //this.mArrows.splice(i,1)
                //i--;
            }
        }
    }
    //_______________________________________________________________

    this.playExplosionSound = function ()
    {
        if(mAudioSaport)
        {
            mCurrentExplosionSound++;
            if(mCurrentExplosionSound > 3)
                mCurrentExplosionSound = 0;
            mExplosionSounds[mCurrentExplosionSound].play();
        }
    }
    //_______________________________________________________________

    this.chackCollision = function (iArrow)
    {
        for(var k=0; k <  this.mTargets.length; k++)
        {
            var dx = iArrow.x -  this.mTargets[k].centerX();
            var dy = iArrow.y -  this.mTargets[k].centerY();
            var distance = Math.sqrt( dx*dx + dy*dy);
            if(distance < 30)
            {
                var aExplo = this.explo .clone();
                aExplo.x = this.mTargets[k].x;
                aExplo.y = this.mTargets[k].y;
                aExplo.playOnce = true;
                this.removeChild(this.mTargets[k])
                this.mTargets.splice(k,1);

                this.addChild(aExplo);
                return (true);
            }
        }
        return (false);
    }
    //_______________________________________________________________

    this.touchMove = function (iX,iY)
    {
        mMouseX =iX;
        mMouseY = iY;
    }
    //______________________________________________

    this.touchEnd = function()
    {
        this.shoot();
    }
}

CGameManager.prototype =  new DisplayObject.Sprite;
CGameManager.prototype.constructor = CGameManager;
CGameManager.prototype.toString = function()
{
    return("CGameManager");
}

