const express = require('express');
const router = express.Router();
const c = require('../controllers/memberController');

router.get('/', c.getMembers);
router.get('/:id', c.getMember);
router.post('/', c.createMember);
router.put('/:id', c.updateMember);
router.delete('/:id', c.deleteMember);

module.exports = router;