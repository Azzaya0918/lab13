# AI Session 02 — Loan Feature

**Огноо:** 3-р өдөр  
**Зорилго:** Зээлэлт олгох, буцаалт бүртгэх логик

## Асуулт
> Зээлэлт олгохдоо ном available эсэхийг шалгах логик яаж хийх вэ?

## AI хариу (товчилсон)
- `issueLoan`: book available шалгах → loan insert → book available=0 болгох
- `returnLoan`: loan олох → returned_at тавих → book available=1 болгох

## Hallucination олдсон
AI due_date тооцоолоход `moment.js` ашиглахыг санал болгосон — гэхдээ vanilla JS `Date` хангалттай, нэмэлт dependency шаардлагагүй.

## Шийдвэр
Native JS Date ашигласан, moment.js татгалзав