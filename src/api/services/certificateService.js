// src/services/certificateService.js
const PDFDocument = require('pdfkit');
const fs         = require('fs');
const path       = require('path');
const { Certificate, User, Course } = require('../../db/models/index');

async function createCertificate(userId, courseId) {
  // fetch for personalization
  const user   = await User.findByPk(userId);
  const course = await Course.findByPk(courseId);
  if (!user || !course) {
    throw new Error('Cannot generate certificate: missing user or/or course');
  }

  // ensure output dir exists
  const outDir = path.resolve(process.cwd(), 'public', 'certificates');
  await fs.promises.mkdir(outDir, { recursive: true });

  // filename
  const timestamp = Date.now();
  const fileName  = `certificate_${userId}_${courseId}_${timestamp}.pdf`;
  const filePath  = path.join(outDir, fileName);

  // build PDF
  const doc    = new PDFDocument({ size: 'LETTER', margin: 50 });
  const stream = fs.createWriteStream(filePath);
  doc.pipe(stream);

  doc
    .fontSize(24)
    .text('Certificate of Completion', { align: 'center' })
    .moveDown(2);

  doc
    .fontSize(18)
    .text('This is to certify that', { align: 'center' })
    .moveDown(0.5)
    .fontSize(20)
    .text(user.full_name, { align: 'center', underline: true })
    .moveDown(1.5);

  doc
    .fontSize(16)
    .text('has successfully completed the course', { align: 'center' })
    .moveDown(0.5)
    .fontSize(18)
    .text(`"${course.name}"`, { align: 'center', italics: true })
    .moveDown(2);

  const dateStr = new Date().toLocaleDateString();
  doc
    .fontSize(14)
    .text(`Date: ${dateStr}`, { align: 'center' })
    .moveDown(3);

  doc.end();

  // wait for file write
  await new Promise((resolve, reject) => {
    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  // record in DB
  const url_link = `/certificates/${fileName}`;
  const info     = { course_id: courseId, issued_at: dateStr };

  const cert = await Certificate.create({
    user_id:  userId,
    url_link,
    info
  });

  return cert;
}

module.exports = { createCertificate };
