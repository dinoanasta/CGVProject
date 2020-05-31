let mixer;
function createAvatar(){
    loader.load(
        // "../../Models/New Models/astronaut/scene.gltf",
        "../../Models/samba_dancing/scene.gltf",
        function (object) {
            object.scene.traverse( function( object ) {
                if ( object.isMesh ) {
                    object.castShadow = true;
                }
            } );

            avatar = object.scene.children[0];
            //Reads animations from models and stores them
            let animation = object.animations[ 0 ];

            //Adds animation to animation mixer
            //Mixer controls the updating of the model as the animation progresses
            mixer = new THREE.AnimationMixer(avatar);
            mixers.push(mixer);

            //Creates The Animation Clip
            let action = mixer.clipAction(animation);
            //Plays animation but won't actually start playing until we set up the timer
            action.play();

            avatar.position.set(0, 0, 80);
            avatar.scale.set(11, -11, 11);

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
            scene.add(avatar);
        }
    );
}

function moveAvatar(){
    let moveX =  AvatarMoveDirection.x;
    let moveZ =  AvatarMoveDirection.z;

    if(moveX==1){
        if(avatarLocalPos.x + moveX*2 < movementBoundaries.rightX){
            avatar.position.x += moveX*2;
            avatarLocalPos.x += moveX*2;


            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveX==-1 ){
        if(avatarLocalPos.x + moveX*2 > movementBoundaries.leftX) {
            avatar.position.x += moveX*2;
            avatarLocalPos.x += moveX*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==-1){
        if(avatarLocalPos.z + moveZ*2 > movementBoundaries.frontZ) {
            avatar.position.z += moveZ*2;
            avatarLocalPos.z += moveZ*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }else if(moveZ==1){
        if(avatarLocalPos.z + moveZ*2 < movementBoundaries.backZ) {
            avatar.position.z += moveZ*2;
            avatarLocalPos.z += moveZ*2;

            avatarPosition.set(avatar.position.x, avatar.position.y, avatar.position.z);
        }
    }
}

function deleteAvatar(){
    scene.remove(avatar)
    mixers.pop(mixer);
    AvatarMoveDirection = { x: 0, z: 0 };
    avatarLocalPos = { x: 0, z: 0 };
}