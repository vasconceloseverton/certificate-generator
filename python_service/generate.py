import sys
import json
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib.units import inch
from reportlab.lib import colors

def generate_certificate(data):
    try:
        # Create PDF on stdout
        c = canvas.Canvas(sys.stdout.buffer, pagesize=landscape(A4))
        width, height = landscape(A4)

        # Background (optional, simple border for now)
        c.setStrokeColor(colors.darkblue)
        c.setLineWidth(5)
        c.rect(0.5*inch, 0.5*inch, width-1*inch, height-1*inch)

        # Title
        c.setFont("Helvetica-Bold", 30)
        c.drawCentredString(width/2, height - 2*inch, "Certificate of Participation")

        # Subtitle
        c.setFont("Helvetica", 15)
        c.drawCentredString(width/2, height - 2.5*inch, "This is to certify that")

        # Name
        c.setFont("Helvetica-Bold", 25)
        c.drawCentredString(width/2, height - 3.5*inch, data.get('name', 'Unknown Name'))

        # Course Text
        c.setFont("Helvetica", 15)
        c.drawCentredString(width/2, height - 4.5*inch, "has successfully completed the course")

        # Course Name
        c.setFont("Helvetica-Bold", 20)
        c.drawCentredString(width/2, height - 5*inch, data.get('course', 'Unknown Course'))

        # Date
        c.setFont("Helvetica", 12)
        c.drawString(1*inch, 1*inch, f"Date: {data.get('date', 'N/A')}")

        # Instructor
        c.drawString(width - 3*inch, 1*inch, f"Instructor: {data.get('instructor', 'N/A')}")

        c.showPage()
        c.save()
    except Exception as e:
        sys.stderr.write(str(e))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        try:
            data = json.loads(sys.argv[1])
            generate_certificate(data)
        except json.JSONDecodeError:
            sys.stderr.write("Invalid JSON input")
            sys.exit(1)
    else:
        sys.stderr.write("No input data provided")
        sys.exit(1)
