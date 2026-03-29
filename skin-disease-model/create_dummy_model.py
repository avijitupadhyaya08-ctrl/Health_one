import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.applications import DenseNet121

def build_densenet():
    densenet = DenseNet121(
        weights=None, # Use None since we don't need pretrained weights for a dummy model
        include_top=False,
        input_shape=(240, 240, 3)
    )
    model = Sequential()
    model.add(densenet)
    model.add(GlobalAveragePooling2D())
    model.add(Dropout(0.5))
    model.add(Dense(9, activation='softmax'))
    
    model.compile(
        loss='categorical_crossentropy',
        optimizer='adam',
        metrics=['accuracy']
    )
    
    return model

if __name__ == "__main__":
    model = build_densenet()
    model.save('skin_disease_model_ISIC_densenet.h5')
    print("Dummy model saved as skin_disease_model_ISIC_densenet.h5")
