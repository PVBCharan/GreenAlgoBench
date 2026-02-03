"""
Quick test script for the /analyze endpoint
"""
import requests
import json
import time

def test_quick_analyze():
    """Test the quick analyze endpoint"""
    url = "http://localhost:8000/api/analyze/quick"
    
    print("Testing /api/analyze/quick endpoint...")
    print(f"URL: {url}\n")
    
    try:
        response = requests.get(url)
        
        if response.status_code != 200:
            print(f"❌ ERROR: HTTP {response.status_code}")
            print(f"Response: {response.text[:500]}")
            return False
        
        data = response.json()
        print("✅ SUCCESS! Response:")
        print(json.dumps(data, indent=2))
        
        # Verify key fields
        assert "status" in data, "Missing 'status' field"
        assert "best_algorithm" in data, "Missing 'best_algorithm' field"
        assert "algorithms" in data, "Missing 'algorithms' field"
        assert data["status"] == "success", f"Status is {data['status']}, expected 'success'"
        
        print("\n✅ All validations passed!")
        
    except requests.exceptions.ConnectionError:
        print("❌ ERROR: Could not connect to http://localhost:8000")
        print("   Make sure the backend server is running")
        return False
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

def test_analyze_status():
    """Test the analyze status endpoint"""
    url = "http://localhost:8000/api/analyze/status"
    
    print("\n\nTesting /api/analyze/status endpoint...")
    print(f"URL: {url}\n")
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        data = response.json()
        print("✅ SUCCESS! Response:")
        print(json.dumps(data, indent=2))
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False
    
    return True

def test_full_analyze():
    """Test the full analyze endpoint"""
    url = "http://localhost:8000/api/analyze?full_run=false"
    
    print("\n\nTesting POST /api/analyze endpoint (quick mode)...")
    print(f"URL: {url}\n")
    
    try:
        response = requests.post(url)
        response.raise_for_status()
        
        data = response.json()
        print("✅ SUCCESS! Response:")
        print(json.dumps(data, indent=2)[:500])  # Print first 500 chars
        print("...\n")
        
        # Verify key fields
        assert "status" in data, "Missing 'status' field"
        
        print("✅ All validations passed!")
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return False
    
    return True

if __name__ == "__main__":
    print("=" * 60)
    print("GreenAlgoBench API Endpoint Tests")
    print("=" * 60 + "\n")
    
    test_quick_analyze()
    test_analyze_status()
    test_full_analyze()
    
    print("\n" + "=" * 60)
    print("All tests completed!")
    print("=" * 60)
