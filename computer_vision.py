import cv2
import torch
import argparse

def detect(weights, source):
    model = torch.hub.load('ultralytics/yolov5', 'custom', path=weights, force_reload=True)
    cap = cv2.VideoCapture(source)

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        results = model(frame)

        results.render()

        cv2.imshow("Object Detection", results.imgs[0])
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--weights', type=str, default='best.pt', help='Path to weights file')
    parser.add_argument('--source', type=str, default='0', help='Source for detection (0 for webcam)')
    opt = parser.parse_args()

    detect(opt.weights, opt.source)
