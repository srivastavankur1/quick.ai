import sql from "../configs/db.js";

export const getUserCreations = async (req, res) => {
  try {
    const { userId } = req.auth();

    const creations =
      await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getPublishedCreations = async (req, res) => {
  try {
    const creations =
      await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

    res.json({ success: true, creations });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;

    const [creation] = await sql`SELECT * FROM creations WHERE  id = ${id}`;

    if ( !creation) {
        return res.json({success: false, message:"Creation Not Found"})
    }

    const currentLikes = creation.likes;
    const userIdStr = userId.toString();
    let updatedikes;
    let message;

    if(currentLikes.includes(userIdStr)){
        updatedikes = currentLikes.filter((user)=>user !== userIdStr)
        message= 'Creation Unliked'
    }else{
        updatedikes = [...currentLikes,userIdStr]
        message ='Creation Liked'
    }

    const formattedArray = `{${updatedikes.join(',')}}`

   await sql `UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`

    res.json({ success: true, message });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
