"use client";

import { useState } from "react";

interface PrescriptionData {
  prescriptionId: string;
  date: string;
  patient: {
    name: string;
    id: string;
    age: number;
    gender: string;
    phone: string;
  };
  doctor: {
    name: string;
    license: string;
    specialty: string;
  };
  diagnosis: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    timing: string;
    duration: string;
    instructions: string;
  }>;
  generalInstructions: string;
  followUpDate?: string;
}

interface PrescriptionGeneratorProps {
  prescriptionData: PrescriptionData;
  onGenerate?: () => void;
}

export function PrescriptionGenerator({
  prescriptionData,
  onGenerate,
}: PrescriptionGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGeneratePrescription = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setIsGenerated(true);
    onGenerate?.();
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Prescription - ${prescriptionData.patient.name}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h2, h3 { margin-bottom: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            td, th { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h2>Prescription</h2>
          <h3>Patient Details</h3>
          <p><strong>Name:</strong> ${prescriptionData.patient.name}</p>
          <p><strong>Age/Gender:</strong> ${prescriptionData.patient.age} / ${prescriptionData.patient.gender}</p>
          <p><strong>Phone:</strong> ${prescriptionData.patient.phone}</p>

          <h3>Doctor Details</h3>
          <p><strong>Name:</strong> Dr. ${prescriptionData.doctor.name}</p>
          <p><strong>Specialty:</strong> ${prescriptionData.doctor.specialty}</p>
          <p><strong>License:</strong> ${prescriptionData.doctor.license}</p>

          <h3>Diagnosis</h3>
          <p>${prescriptionData.diagnosis}</p>

          <h3>Medications</h3>
          <table>
            <tr>
              <th>Name</th>
              <th>Dosage</th>
              <th>Frequency</th>
              <th>Timing</th>
              <th>Duration</th>
              <th>Instructions</th>
            </tr>
            ${prescriptionData.medications
              .map(
                (med) => `
              <tr>
                <td>${med.name}</td>
                <td>${med.dosage}</td>
                <td>${med.frequency}</td>
                <td>${med.timing}</td>
                <td>${med.duration}</td>
                <td>${med.instructions}</td>
              </tr>`
              )
              .join("")}
          </table>

          <h3>General Instructions</h3>
          <p>${prescriptionData.generalInstructions}</p>

          ${
            prescriptionData.followUpDate
              ? `<p><strong>Follow-up Date:</strong> ${prescriptionData.followUpDate}</p>`
              : ""
          }

          <p style="margin-top: 30px;">Prescription ID: ${prescriptionData.prescriptionId}</p>
          <p>Date: ${prescriptionData.date}</p>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md border max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Prescription Generator</h2>
      <button
        onClick={handleGeneratePrescription}
        disabled={isGenerating}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isGenerating ? "Generating..." : "Generate Prescription"}
      </button>

      {isGenerated && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Prescription Ready</h3>
          <button
            onClick={handleDownloadPDF}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Download as PDF
          </button>
        </div>
      )}
    </div>
  );
}
