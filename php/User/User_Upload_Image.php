<?php
    if(is_array($_FILES)) {
        if(is_uploaded_file($_FILES['userImage']['tmp_name'])) {
            $sourcePath = $_FILES['userImage']['tmp_name'];
            $targetPath = "../../assets/img_users/".$_FILES['userImage']['name'];
            if(move_uploaded_file($sourcePath,$targetPath)) {
                ?>
                    <img id="ipt_user_image" name="<?php echo $_FILES['userImage']['name']; ?>" src="../../assets/img_users/<?php echo $_FILES['userImage']['name']; ?>" width="200px" height="200px" class="upload-preview" />
                <?php
            }
        }
    }
?>