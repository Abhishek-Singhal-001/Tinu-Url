const express=require('express');
const router=express.Router();

const {postController,getAllLinkController,deleteLinksCodeController,getStats,getRedirect,getHealth}=require('./controller.js');

router.post('/links',postController);
router.get('/links',getAllLinkController);
router.get('/links/:code',getStats);
router.delete('/links/:code',deleteLinksCodeController);
router.get('/links/:code/redirect',getRedirect);
router.get('/healthz',getHealth);

module.exports=router;