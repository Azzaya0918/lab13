const memberService = require('../services/memberService');

async function getMembers(req, res, next) {
  try {
    const members = memberService.findAll();
    res.json({ success: true, data: members });
  } catch (err) { next(err); }
}

async function getMember(req, res, next) {
  try {
    const member = memberService.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
    res.json({ success: true, data: member });
  } catch (err) { next(err); }
}

async function createMember(req, res, next) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'name and email are required' });
    }
    const member = memberService.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (err) { next(err); }
}

async function updateMember(req, res, next) {
  try {
    const member = memberService.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
    const updated = memberService.update(req.params.id, req.body);
    res.json({ success: true, data: updated });
  } catch (err) { next(err); }
}

async function deleteMember(req, res, next) {
  try {
    const member = memberService.findById(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
    memberService.remove(req.params.id);
    res.json({ success: true, message: 'Member deleted' });
  } catch (err) { next(err); }
}

module.exports = { getMembers, getMember, createMember, updateMember, deleteMember };