import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Carbon Footprint Data Service
export class CarbonFootprintService {
  
  // Save carbon footprint calculation
  static async saveFootprintData(userId, footprintData) {
    try {
      const data = {
        userId,
        ...footprintData,
        calculatedAt: serverTimestamp(),
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'carbonFootprints'), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error saving footprint data:', error);
      throw error;
    }
  }

  // Get user's carbon footprint history
  static async getUserFootprints(userId, limitCount = 10) {
    try {
      const q = query(
        collection(db, 'carbonFootprints'),
        where('userId', '==', userId),
        orderBy('calculatedAt', 'desc'),
        limit(limitCount)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user footprints:', error);
      throw error;
    }
  }

  // Get latest carbon footprint
  static async getLatestFootprint(userId) {
    try {
      const q = query(
        collection(db, 'carbonFootprints'),
        where('userId', '==', userId),
        orderBy('calculatedAt', 'desc'),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Error fetching latest footprint:', error);
      throw error;
    }
  }

  // Save user preferences
  static async saveUserPreferences(userId, preferences) {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        preferences: {
          ...preferences,
          updatedAt: serverTimestamp()
        }
      });
      return true;
    } catch (error) {
      console.error('Error saving user preferences:', error);
      throw error;
    }
  }

  // Get user preferences
  static async getUserPreferences(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const userSnap = await getDoc(userRef);
      
      if (userSnap.exists()) {
        return userSnap.data().preferences || {};
      }
      return {};
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  }

  // Save tips and recommendations
  static async saveTip(userId, tipData) {
    try {
      const data = {
        userId,
        ...tipData,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'tips'), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error saving tip:', error);
      throw error;
    }
  }

  // Get user's saved tips
  static async getUserTips(userId) {
    try {
      const q = query(
        collection(db, 'tips'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user tips:', error);
      throw error;
    }
  }

  // Save feedback
  static async saveFeedback(userId, feedbackData) {
    try {
      const data = {
        userId,
        ...feedbackData,
        createdAt: serverTimestamp()
      };
      
      const docRef = await addDoc(collection(db, 'feedback'), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error saving feedback:', error);
      throw error;
    }
  }

  // Get user's feedback history
  static async getUserFeedback(userId) {
    try {
      const q = query(
        collection(db, 'feedback'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user feedback:', error);
      throw error;
    }
  }

  // Save goal setting
  static async saveGoal(userId, goalData) {
    try {
      const data = {
        userId,
        ...goalData,
        createdAt: serverTimestamp(),
        status: 'active'
      };
      
      const docRef = await addDoc(collection(db, 'goals'), data);
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error('Error saving goal:', error);
      throw error;
    }
  }

  // Get user's goals
  static async getUserGoals(userId) {
    try {
      const q = query(
        collection(db, 'goals'),
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user goals:', error);
      throw error;
    }
  }

  // Update goal status
  static async updateGoalStatus(goalId, status) {
    try {
      const goalRef = doc(db, 'goals', goalId);
      await updateDoc(goalRef, {
        status,
        updatedAt: serverTimestamp()
      });
      return true;
    } catch (error) {
      console.error('Error updating goal status:', error);
      throw error;
    }
  }

  // Delete data
  static async deleteFootprint(footprintId) {
    try {
      await deleteDoc(doc(db, 'carbonFootprints', footprintId));
      return true;
    } catch (error) {
      console.error('Error deleting footprint:', error);
      throw error;
    }
  }

  static async deleteGoal(goalId) {
    try {
      await deleteDoc(doc(db, 'goals', goalId));
      return true;
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }

  // Get user statistics
  static async getUserStats(userId) {
    try {
      const footprints = await this.getUserFootprints(userId, 30); // Last 30 entries
      const goals = await this.getUserGoals(userId);
      
      if (footprints.length === 0) {
        return {
          totalFootprints: 0,
          averageFootprint: 0,
          totalGoals: goals.length,
          activeGoals: goals.filter(g => g.status === 'active').length,
          completedGoals: goals.filter(g => g.status === 'completed').length
        };
      }

      const totalFootprint = footprints.reduce((sum, fp) => sum + (fp.total || 0), 0);
      const averageFootprint = totalFootprint / footprints.length;

      return {
        totalFootprints: footprints.length,
        averageFootprint: Math.round(averageFootprint * 100) / 100,
        totalGoals: goals.length,
        activeGoals: goals.filter(g => g.status === 'active').length,
        completedGoals: goals.filter(g => g.status === 'completed').length,
        latestFootprint: footprints[0]
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  }
}

export default CarbonFootprintService;
