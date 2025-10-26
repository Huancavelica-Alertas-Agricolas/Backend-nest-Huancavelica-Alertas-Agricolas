"""
Script de entrenamiento sencillo para el CSV exportado desde KNIME.
Genera un modelo XGBoost y exporta predicciones.
Requisitos: pip install pandas scikit-learn xgboost joblib
Uso:
    python scripts/train_model.py --input docs/data/knime/senamhi_cleaned.csv --out docs/data/knime/predictions_senamhi.csv
"""
import argparse
import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import xgboost as xgb
import joblib


def load_data(path):
    df = pd.read_csv(path, parse_dates=['fecha'])
    return df


def prepare_features(df, target_col='temp_min'):
    # Drop rows without target
    df = df.copy()
    df = df.dropna(subset=[target_col])

    # Identify potential feature columns (exclude identifiers)
    exclude = {'fecha', 'estacion_codigo', target_col}
    features = [c for c in df.columns if c not in exclude and df[c].dtype in [np.float64, np.int64, 'int64', 'float64']]

    if not features:
        raise ValueError('No numeric features found. Asegúrate de generar lags y agregaciones en KNIME.')

    X = df[features]
    y = df[target_col]
    return X, y, df


def train_and_predict(df, target_col='temp_min', test_size=0.2, random_state=42):
    X, y, df_full = prepare_features(df, target_col=target_col)

    # Simple time-based split: keep last test_size fraction as test
    n = len(df_full)
    split_idx = int(n * (1 - test_size))

    X_train = X.iloc[:split_idx]
    X_test = X.iloc[split_idx:]
    y_train = y.iloc[:split_idx]
    y_test = y.iloc[split_idx:]

    model = xgb.XGBRegressor(n_estimators=200, max_depth=6, learning_rate=0.05, random_state=random_state)
    model.fit(X_train, y_train)

    preds = model.predict(X_test)

    metrics = {
        'rmse': float(mean_squared_error(y_test, preds, squared=False)),
        'mae': float(mean_absolute_error(y_test, preds)),
        'r2': float(r2_score(y_test, preds))
    }

    # Build predictions dataframe
    out_df = df_full.iloc[split_idx:].copy()
    out_df['prediction'] = preds

    return model, out_df, metrics


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', required=True, help='CSV limpio generado por KNIME (senamhi_cleaned.csv)')
    parser.add_argument('--out', required=True, help='CSV de salida con predicciones')
    parser.add_argument('--model-out', default='models/xgb_senamhi.joblib', help='Ruta para guardar modelo')
    args = parser.parse_args()

    os.makedirs(os.path.dirname(args.model_out), exist_ok=True)

    print(f'Loading data from {args.input}...')
    df = load_data(args.input)

    print('Training model...')
    model, out_df, metrics = train_and_predict(df)

    print('Metrics:')
    for k, v in metrics.items():
        print(f'  {k}: {v:.4f}')

    print(f'Writing predictions to {args.out}...')
    out_df.to_csv(args.out, index=False)

    print(f'Saving model to {args.model_out}...')
    joblib.dump(model, args.model_out)

    print('Done.')
