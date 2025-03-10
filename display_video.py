import cv2

# Capture video from the default camera
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()

    cv2.imshow('Video', frame)

    # Break the loop if the 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the camera and close the window
cap.release()
cv2.destroyAllWindows()
