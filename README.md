\# ThreatPulse



\### AI-Powered Integrated Phishing and Deepfake Detection System



ThreatPulse is an integrated security platform that brings together phishing detection and deepfake detection through a common dashboard.



It combines two existing projects into one platform:



\* \*\*PhishShield:\*\* Detects phishing-related threats such as suspicious URLs, emails, QR codes, and screenshots.

\* \*\*DeepShield:\*\* Detects potentially manipulated images and audio using deep learning models.



\## Project Architecture



```text

&#x20;                ThreatPulse

&#x20;                     |

&#x20;             Integration Dashboard

&#x20;                     |

&#x20;            ---------------------

&#x20;            |                   |

&#x20;        PhishShield         DeepShield

&#x20;            |                   |

&#x20;     Phishing Detection    Deepfake Detection

&#x20;            |                   |

&#x20;      URL / Email / QR      Image / Audio

&#x20;            |                   |

&#x20;      ML / NLP Models       Deep Learning

&#x20;            |                   |

&#x20;            ---------------------

&#x20;                     |

&#x20;               Detection Result

```



\## Main Modules



\### 1. PhishShield



PhishShield focuses on phishing detection.



Features:



\* URL phishing detection using XGBoost.

\* Email phishing detection using RoBERTa.

\* Domain information analysis using WHOIS.

\* QR code extraction and analysis.

\* Screenshot-based phishing analysis.

\* Risk score aggregation.



\### 2. DeepShield



DeepShield focuses on deepfake detection.



Features:



\* Image-based deepfake detection using EfficientNetV2.

\* Audio-based deepfake detection using Wav2Vec2.

\* Prediction and confidence score display.



\### 3. Integration Dashboard



The integration module provides a common entry point to access both detection systems and check their service status.



\## Technologies Used



\* Python

\* Flask

\* FastAPI

\* HTML, CSS, JavaScript

\* Scikit-learn

\* XGBoost

\* Hugging Face Transformers

\* PyTorch

\* OpenCV



\## Repository Structure



```text

ThreatPulse/

│

├── PhishShield/

│   ├── backend/

│   ├── frontend/

│   ├── requirements.txt

│   └── README.md

│

├── DeepShield/

│   ├── backend/

│   ├── resources/

│   ├── requirements.txt

│   └── README.md

│

├── integration/

│   ├── app.py

│   ├── templates/

│   └── static/

│

├── documentation/

├── .gitignore

└── README.md

```



\## Running the Project



The project uses separate services for the two detection modules and the integration dashboard.



Start each service in a separate terminal.



| Service               | Port |

| --------------------- | ---: |

| PhishShield Backend   | 8000 |

| PhishShield Frontend  | 5000 |

| DeepShield            | 8001 |

| ThreatPulse Dashboard | 5001 |



\### Access the dashboard



After starting all services, open:



`http://127.0.0.1:5001`



\### Model Files



The trained model weights are large files and are not included in normal Git commits.



Download the required model files from the project's GitHub Releases:



\*\*Model download instructions:\*\* To be added after publishing the release assets.



Place each downloaded model in its corresponding directory:



| Model         | Required location                                                |

| ------------- | ---------------------------------------------------------------- |

| Audio model   | `DeepShield/backend/models/audio\_model/model.safetensors`        |

| Image model   | `DeepShield/backend/models/image\_model/EfficientnetV2\_model.pth` |

| RoBERTa model | `PhishShield/backend/models/RoBERTa\_model/model.safetensors`     |



The project requires these model files for the corresponding detection features.



\## Project Credits and Acknowledgements



This project integrates and builds upon the following existing projects:



\* \*\*PhishGuard:\*\* \[Nandan-1127/PhishGuard-Multimodal-Phishing-Detection-System](https://github.com/Nandan-1127/PhishGuard-Multimodal-Phishing-Detection-System)

\* \*\*Multimodal Deepfake Detection:\*\* \[Akshayredekar07/Multimodal-Deepfake-Detection](https://github.com/Akshayredekar07/Multimodal-Deepfake-Detection)



Their original authors and licenses are acknowledged. The integrated platform does not claim ownership of the original projects or their pretrained models.



\## Team



\*\*Project:\*\* ThreatPulse



\*\*Team Members:\*\*



1\. Soumya Dubey

2\. Priyanka Bala

3\. Tanishka Mohod

4\. Tanushri Patil



\## Future Scope



\* Centralized file submission and analysis.

\* Real-time threat monitoring.

\* Automated threat prevention.

\* Improved model evaluation and calibration.

\* Enhanced reporting and visualization.



\---



\*\*ThreatPulse — Integrated AI-Based Security Detection\*\*



